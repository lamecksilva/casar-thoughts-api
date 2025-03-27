import { faker } from '@faker-js/faker'; // Biblioteca para gerar dados falsos
import { PostEntityTypeORM } from 'src/domain/entities/post.entity';
import { UserEntityTypeORM } from 'src/domain/entities/user.entity';
import AppDataSource from './typeorm.config';

const dataSource = AppDataSource;

function getRandomSentiment(): string {
  const sentiments = ['pos', 'neg', 'neutral'];

  return sentiments[Math.floor(Math.random() * sentiments.length)];
}

async function seedDatabase() {
  await dataSource.initialize();
  console.log('DB connected');

  const userRepository = dataSource.getRepository(UserEntityTypeORM);
  const postRepository = dataSource.getRepository(PostEntityTypeORM);

  const users: UserEntityTypeORM[] = [];
  for (let i = 0; i < 10; i++) {
    const user = userRepository.create({
      username: faker.internet
        .username()
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(0, 14),
      displayName: faker.person.fullName(),
      following: [],
      followers: [],
      posts: [],
    });
    users.push(user);
  }

  await userRepository.save(users);
  console.log('Users created');

  const posts: PostEntityTypeORM[] = [];
  for (const user of users) {
    const postCount = faker.number.int({ min: 1, max: 5 }); // Cada usuário tem de 1 a 5 posts
    for (let i = 0; i < postCount; i++) {
      const post = postRepository.create({
        text: faker.lorem.sentence(),
        user,
        sentiment: getRandomSentiment(),
      });
      posts.push(post);
    }
  }

  await postRepository.save(posts);
  console.log('Posts created');

  console.log('Seed finished');
  process.exit();
}

// Executa a função de seed
seedDatabase().catch((error) => {
  console.error('Erro ao popular o banco de dados:', error);
  process.exit(1);
});
