var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.listarEmpresas((error, docs) => {
  	if(error){return console.log(error);}
  	
  	console.log(docs);
  	res.render('index', { title: 'Lista de Empresas', docs : docs });    

  })  
});


router.get('/new', function(req, res) {
	res.render('new', { title: 'Cadastrar Empresas'});
})

router.post('/new', function(req, res){
	var nome = req.body.nome;
	var numero = parseInt(req.body.numero);

	global.db.adicionarEmpresa( {nome, numero}, (error, result)  => {
		if(error){return console.log(error);}
		res.redirect('/');
	});
});



router.get('/newFuncio', function(req, res) {
	global.db.listarFuncionario((error, docsFuncio) => {
		if(error){return console.log(error);}
		
		console.log(docsFuncio);
		res.render('newFuncio', { title: 'Lista de Funcionario e Cadastro', docsFuncio : docsFuncio });    
  
	})  
  });

  
router.get('/newFuncio', function(req, res) {
	res.render('newFuncio', { title: 'Cadastrar Funcionario'});
})

router.post('/newFuncio', function(req, res){
	var nomeFunc = req.body.nomeFunc;
	var matricula = parseInt(req.body.matricula);
	var rg = req.body.rg;
	var cpf = parseInt(req.body.cpf);
	var rua = req.body.rua;
	var numero = parseInt(req.body.numero);
	var bairro = req.body.bairro;
	var cidade = req.body.cidade;


	global.db.adicionarFuncionario( {nomeFunc, matricula, rg, cpf, rua, numero, 
								 bairro, cidade}, (error, result)  => {
		if(error){return console.log(error);}
		res.redirect('/newFuncio');
	});
});

//empresa editar 

	router.post('/editar/:id', function(req, res){
	var id = req.params.id;
	var nome = req.body.nome;
	var numero = parseInt(req.body.numero);
	global.db.atualizarEmpresa(id, { nome, numero }, (error, resultado) => {
	  if(error){ return console.log(error);}
	  res.redirect('/');
	});
  });
  
  router.get('/editar/:id', function(req, res){
	  var id = req.params.id;
	  global.db.buscarEmpresaPorId(id, (error, docs) => {
		 if(error) { return console.log(error);}
		 res.render('editar', {title: "Atualizar uma empresa", 
		 dadosempresa : docs[0], action: '/editar/' + docs[0]._id});
	  });
  });

//empresa deletar

  router.get('/deletar/:id', function(req, res){
    var id = req.params.id;
    global.db.deletarEmpresa(id, (error, docs) => {
      if(error) { return console.log(error);}
      res.redirect('/');
    })
})
//funcionario editar
	router.get('/funceditar/:id', function(req, res){
	var id = req.params.id;
	global.db.buscarFuncionarioPorId(id, (error, docs) => {
	  if(error) { return console.log(error);}
	  res.render('editarFunc', {title: "Editar um funcionário", 
	  dadosfuncionario : docs[0], action: '/funceditar/' + docs[0]._id});
	});
  });
  
	router.post('/funceditar/:id', function(req, res){
		var id = req.params.id;
		var nome = req.body.nomeFuncionario;
		var matricula = req.body.matricula;
		var rg = req.body.rg;
		var cpf = req.body.cpf;
		var rua = req.body.rua;
		var numero = req.body.numero;
		var bairro = req.body.bairro;
		var cidade = req.body.cidade;
		global.db.atualizarFuncionario(id, { nome, matricula, rg, cpf, rua, numero, bairro, cidade }, 
		(error, resultado) => {
		if(error){ return console.log(error);}
		res.redirect('/newFuncio');
		});
	});
	
	//funcionario deletar

	router.get('/funcdeletar/:id', function(req, res){
		var id = req.params.id;
		global.db.deletarFuncionario(id, (error, docs) => {
		if(error) { return console.log(error);}
		res.redirect('/newFuncio');
		})
	})


module.exports = router;
