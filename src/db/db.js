import Dexie from 'dexie';

const db = new Dexie('ReactSampleDB');
db.version(1).stores({
  form: 'name, age, gender, email',
});

export default db;
