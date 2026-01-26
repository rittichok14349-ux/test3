const prisma = require('../prisma/client');

exports.getAllProducts = async () => {
  return prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });
};

exports.getProductById = async (id) => {
  return prisma.product.findUnique({
    where: { id: Number(id) }
  });
};

exports.createProduct = async (data) => {
  return prisma.product.create({ data });
};

exports.updateProduct = async (id, data) => {
  return prisma.product.update({
    where: { id: Number(id) },
    data
  });
};

exports.deleteProduct = async (id) => {
  return prisma.product.update({
    where: { id: Number(id) },
    data: { isActive: false }
  });
};
