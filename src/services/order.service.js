const prisma = require('../prisma/client');

exports.getAllOrders = async () => {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

exports.getOrderById = async (id) => {
  return prisma.order.findUnique({
    where: { id: Number(id) }
  });
};

exports.createOrder = async (data) => {
  return prisma.order.create({ data });
};

exports.updateOrderStatus = async (id, status) => {
  return prisma.order.update({
    where: { id: Number(id) },
    data: { status }
  });
};
