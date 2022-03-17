import { Request, Response } from 'express';
import { Order, OrderList } from '../models/order';

const orders = new OrderList();

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status
    };
    const newOrder = await orders.create(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const deleted_Order = await orders.delete(req.body.id);
    res.json(deleted_Order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const orders_Indexed = await orders.index();
    res.json(orders_Indexed);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const show_Order = await orders.show(req.params.id as unknown as number);
    res.json(show_Order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
      id: parseInt(req.params.id, 10)
    } as Order;
    const updated_Order = await orders.update(order);
    res.json(updated_Order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export { create, destroy, index, show, update };
