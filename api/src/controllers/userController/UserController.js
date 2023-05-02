const { User, Rol, Sale, Order, OrderItem, Product } = require('../../db');
const { encrypt, compare } = require('../../helpers/password/bcryptHelper');
const { Op } = require('sequelize');
const generateTokenJwt = require('../../helpers/tokenjwt/generateTokenJwt');

const getAllUser = async () => {
  try {
    const allUser = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    });

    if (!allUser.length) throw new Error('Users not found');

    return allUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOneUser = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    });

    if (!user) throw new Error('User not found');

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSearchUser = async (name) => {
  try {
    const usersSearch = await User.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          {
            surname: {
              [Op.iLike]: `%${name}%`,
            },
          },
        ],
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
      }, // Excluir el campo 'password' en los resultados
    });

    if (!usersSearch.length) {
      // Verificar si no se encontraron resultados
      throw new Error('No users with that name or last name were found');
    }

    return usersSearch;
  } catch (error) {
    throw new Error(error.message);
  }
};

const postNewUser = async ({
  name,
  surname,
  password,
  phone,
  mail,
  date_of_birth,
  image
}) => {
  try {
    const passwordHash = await encrypt(password);

    const roles = await Rol.findOne({ where: { rol_name: 'user' } });

    const [user, created] = await User.findOrCreate({
      where: { mail },
      defaults: {
        name,
        surname,
        password: passwordHash,
        phone,
        mail,
        date_of_birth,
        rolId: roles.id,
        image
      },
    });

    if (!created) throw new Error('The email is already registered');

    const token = await generateTokenJwt(user);

    return {
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        mail: user.mail,
        date_of_birth: user.date_of_birth,
        image: user.image
      },
      token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

//En este me faltaría agregar la autenticación con token
const postLoginUser = async ({ mail, password }) => {
  try {
    const user = await User.findOne({ where: { mail } });

    if (!user) throw new Error('User not registered with that email');

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) throw new Error('Invalid credentials');

    const token = await generateTokenJwt(user);

    return {
      message: 'User successfully logged in',
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        mail: user.mail,
        date_of_birth: user.date_of_birth,
        image: user.image
      },
      token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (id, userData) => {

  const user = await User.findByPk(id);

  if (!user) throw new Error('User not found');

  if (userData.password) {
    const checkPassword = await compare(userData.password, user.password);

    if (checkPassword) {
      throw new Error(
        'The password is the same as the current one, you must type a new one'
      );
    }

    const passwordHash = await encrypt(userData.password);

    userData.password = passwordHash;
  }

    await User.update({image: userData.image}, { where: { id } })

    if (
      userData.name === user.name ||
      userData.surname === user.surname ||
      userData.phone === user.phone ||
      userData.date_of_birth === user.date_of_birth ||
      userData.mail === user.mail 
    ) {
      throw new Error(
        'The data provided is the same as the current data. No update is necessary.'
      );
    } else {
      await User.update(userData, { where: { id } });
    
      const { name, surname, mail, date_of_birth, phone, image } = await User.findByPk(
        id
      );
    
      return {
        message: 'User updated successfully',
        user: {
          id,
          name,
          surname,
          mail,
          date_of_birth,
          phone,
          image
        },
      };
    }

};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) throw new Error("User not found")

    await User.destroy({ where: { id } });

    return { message: "User deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
}

const getUserOrder = async (id, page = 1, limit = 4) => {
  const offset = (page - 1) * limit;

  const { count, rows: orders } = await Order.findAndCountAll({
    where: { userId: id },
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
    include: [{
      model: OrderItem,
      as: 'items',
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'deletedAt',
          'orderId',
          'productId',
        ],
      },
      include: {
        model: Product,
        as: 'product',
        attributes: ['name', 'price'],
      }
    },
    {
      model: Sale,
      as: 'sale',
    }],
    limit,
    offset,
  });


  const ordersWithTotal = orders.map((order) => {
    let orderTotal = 0;

    for (const item of order.items) {
      orderTotal += item.product.price;
    }

    return {
      ...order.toJSON(), // Alternativamente, puedes usar Object.assign({}, order)
      total: orderTotal,
    };
  });

  console.log(orders);
  // const total = orders.map(el => el.items?.map(item => ))

  const totalPages = Math.ceil(count / limit);

  return { orders: ordersWithTotal, currentPage: page, totalPages };
};

const putUserOrderCancelar = async (orderId) => {
console.log(orderId);
  const order = await Order.findByPk(orderId);

  if (order) {
    order.status = 'cancelled';
    await order.save();
    return { message: 'Se canceló correctamente' };
  }

  return { message: 'No se encontró la orden' };
}

module.exports = {
  getAllUser,
  getOneUser,
  getSearchUser,
  postNewUser,
  postLoginUser,
  updateUser,
  getUserOrder,
  putUserOrderCancelar,
  // updatePassword
  deleteUser
};
