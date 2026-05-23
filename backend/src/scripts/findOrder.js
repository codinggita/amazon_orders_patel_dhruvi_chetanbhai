import mongoose from 'mongoose';
import Order from '../models/order.model.js';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/shopfusion';

async function run() {
  try {
    await mongoose.connect(MONGO_URL);
    const order = await Order.findOne({ orderId: 'TEST100' }).lean();
    console.log(JSON.stringify(order, null, 2) || 'Order not found');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

run();
