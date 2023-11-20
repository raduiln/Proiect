const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function connect() {
  try {
    await prisma.$connect();
    console.log('Conectat la baza de date.');
  } catch (error) {
    console.error('Eroare la conectarea la baza de date:', error);
  }
}

module.exports = { connect, prisma };
