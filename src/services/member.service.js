const prisma = require('../prisma/client');

exports.getAllMembers = async () => {
  return prisma.member.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

