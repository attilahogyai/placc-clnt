export default function( server ) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

	let company=server.create('company',{name:'Dorsum Zrt.',img:'http://www.dorsum.eu/wp-content/uploads/2016/03/Dorsum_logo_2016-300x77.png'});
	server.create('company',{name:'T-systems',img:'http://www.t-systems.hu/static/sw/g/logo.png'});
	server.create('company',{name:'Balabit',img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Balabit_logo_01.svg/330px-Balabit_logo_01.svg.png'});

	//server.createList('building', 10);
	let building = server.create('building', {company});
	server.createList('level', 4, { building });

	building = server.create('building',{company});
	server.createList('level', 1, { building });

	building = server.create('building');
	server.createList('level', 2, { building });

	building = server.create('building');
	server.createList('level', 1, { building });


}
