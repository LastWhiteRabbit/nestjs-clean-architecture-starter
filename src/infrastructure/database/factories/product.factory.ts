import { setSeederFactory } from 'typeorm-extension';
import { Product } from '../../entities/product.entity';

export default setSeederFactory(Product, (faker) => {
  //   User example
  //   const user = new User();

  //   const sexFlag = faker.number.int(1);
  //   const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';

  //   user.firstName = faker.person.firstName(sex);
  //   user.lastName = faker.person.lastName(sex);

  const product = new Product();

  product.name = faker.commerce.productName();
  product.shortName = faker.commerce.productAdjective();
  product.description = faker.commerce.productDescription();
  product.shortDescription = faker.commerce.productDescription();
  product.createDate = faker.date.recent();
  product.updatedDate = faker.date.recent();

  return product;
});
