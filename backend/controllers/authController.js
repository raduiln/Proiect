const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const secret = "mysecretkey"//process.env.SECRET_KEY; // Cheia secretă pentru generarea token-ului JWT

// Funcție pentru înregistrare (sign-up)
async function signUp(req, res) {
  const { username, password, role, name, surname, email, address, phone } = req.body;

  try {
    // Verificăm dacă utilizatorul există deja în baza de date
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Numele de utilizator este deja folosit.' });
    }

    // Criptăm parola utilizatorului înainte de a o salva în baza de date
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creăm un nou utilizator în baza de date
    const newUser = await prisma.user.create({
      data: { 
        username, 
        password: hashedPassword, 
        role,
        name,
        surname,
        email,
        address,
        phone
      },
    });

    res.status(201).json({ message: 'Înregistrare reușită. Vă puteți autentifica acum.' });
  } catch (error) {
    res.status(500).json({ error: 'Eroare la înregistrare.' });
  }
}

// Funcție pentru autentificare (login)
async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Verificăm dacă utilizatorul există în baza de date
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (!existingUser) {
      return res.status(400).json({ error: 'Numele de utilizator sau parola sunt incorecte.' });
    }

    // verificăm dacă parola este corectă
    const passwordIsValid = await bcrypt.compare(password, existingUser.password);

    if (!passwordIsValid) {
      return res.status(400).json({ error: 'Numele de utilizator sau parola sunt incorecte.' });
    }
    let userClass = null;
    if (existingUser.role === 'STUDENT') {
      // get class name
      const student = await prisma.student.findUnique({ 
        where: { 
          userId: existingUser.id 
        } ,
        select: {
          classes: {
            select: {
              name: true,
            }
          }
        }
      });
      userClass = student?.classes?.name;
    }

    if (existingUser.role === 'TEACHER') {
      // get class name
      const teacher = await prisma.teacher.findUnique({ 
        where: { 
          userId: existingUser.id 
        } ,
        include: {
          class: {
            select: {
              name: true,
            }
          }
        }
      });
      userClass = teacher.class?.name;
    }
    const userName = existingUser.name + ' ' + existingUser.surname;
    // Generăm un token JWT
    const token = jwt.sign({ id: existingUser.id, role: existingUser.role,  name: userName, class: userClass || null}, secret, {
      expiresIn: '24h',
    });

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');

    const data = { message: 'Autentificare reușită.', access_token: token};

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Eroare la autentificare.' });
  }
}

module.exports = {
  signUp,
  login,
};
