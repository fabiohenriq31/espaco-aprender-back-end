const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/Users')
const cors = require('cors');
const admin = require('./config/firebase'); 
const bodyParser = require('body-parser');
const Professional = require('./models/Professional')
const Post = require('./models/Post');

const app = express();
const port = 3001;

const uri = 'mongodb+srv://comerciallojao031:vmacXkJrOmUyPCdU@cluster0.qkqr8ji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
.then(() => console.log('Conexão com o MongoDB Atlas estabelecida.'))
.catch((error) => console.error('Erro ao conectar ao MongoDB Atlas:', error));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Conexão ao MongoDB está aberta.');
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.post('/api/posts', async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const newPost = new Post({ title, content, category });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(400).json({ message: 'Erro ao criar post', error });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.error('Erro ao buscar posts:', err);
    res.status(500).json({ message: 'Erro ao buscar posts', error: err });
  }
});

app.delete('/api/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }
    res.status(200).json({ message: 'Post deletado com sucesso', deletedPost });
  } catch (error) {
    console.error('Erro ao deletar o post:', error);
    res.status(500).json({ message: 'Erro interno ao deletar o post', error });
  }
});

app.post('/api/verifyToken', async (req, res) => {
  const idToken = req.body.idToken;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.status(200).send(decodedToken);
  } catch (error) {
    res.status(401).send('Token inválido');
  }
});

app.post('/api/professionals', async (req, res) => {
  const { nome, email } = req.body;

  try {
    const newProfessional = new Professional({ nome, email });
    await newProfessional.save();
    res.status(201).json(newProfessional);
  } catch (err) {
    console.error('Erro ao criar profissional:', err);
    res.status(400).json({ message: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { uid, name, email, phone } = req.body
  try {
    const newUser = new User({ uid, name, email, phone });
    await newUser.save();
    res.status(201).json({ message: 'Usuário criado com sucesso', data: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar o usuário', error });
  }
})

app.get('/api/users/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await User.findOne({ uid });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o usuário', error });
  }
});

app.use('/api/posts', require('./routes/posts'))
app.use('/api/professionals', require('./routes/professionals'));
app.use('/api/appointments', require('./routes/appointments'));

app.listen(port, () => {
  console.log(`🚀Servidor backend rodando em http://localhost:${port}`);
});
