
--drop table usuarios


CREATE TABLE usuarios (
    id_usuarios int generated always as identity,
    nombre_Apellidos VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    google_id VARCHAR(100) unique,
    estado bool Default true not null,
    fecha_creacion TIMESTAMP NULL DEFAULT now(),
    Primary Key(id_usuarios)
);

--drop table tareas

CREATE TABLE tareas (
    id_tareas int generated always as identity,
    titulo VARCHAR(100) not null UNIQUE,
    descripcion VARCHAR(100) not null,
    fecha_creacion TIMESTAMP NULL DEFAULT now(),
    completada BOOLEAN DEFAULT FALSE,
    importante BOOLEAN DEFAULT FALSE, -- Nueva columna para marcar si la tarea es importante
    id_usuarios int REFERENCES usuarios(id_usuarios) ON DELETE cascade,
    id_grupos int REFERENCES grupos(id_grupos) ON DELETE cascade,
    estado bool default true,
    Primary Key(id_tareas)
);

--drop table grupos

CREATE TABLE grupos(
    id_grupos int generated always as identity,
    fecha_creacion TIMESTAMP NULL DEFAULT now(),
    titulo VARCHAR(100) not null UNIQUE,
    descripcion VARCHAR(100) not null,
    id_usuarios int REFERENCES usuarios(id_usuarios) ON DELETE cascade,
    estado bool default true,
    Primary Key(id_grupos)
);



-------------funcion para iniciar sesion con google--------------

CREATE OR REPLACE FUNCTION public.verification_google(p_email character varying)
 RETURNS TABLE(verification integer, mensaje character varying)
 LANGUAGE plpgsql
AS $function$
declare
	User_Deshabili bool;
	User_Exit bool;
begin
	--Primero Verificar si el correo que se esta ingresando existe
	select into User_Exit case when COUNT(*)>=1 then True else false end  from usuarios where email=p_email;	
	--Segundo  Verificar si el usuario tiene un estado habilitado o deshabilitado
	if (User_Exit) then 
		select into User_Deshabili estado from usuarios where email=p_email;
		if (User_Deshabili) then 
			return query
			select
			cast(case when COUNT(*)>=1 then 1 else 2 end as int),
			 cast(case when COUNT(*)>=1 then 'Login Correcto' else 'Contraseña incorrecta' end as varchar(500))
			from usuarios
			where email  = p_email 
   			and estado=true;
   		else 
   			return query
			select cast(3 as int), cast('Usuario deshabilitado contacte con un administrador' as varchar(500));
		end if;
	else 
	   		return query
			select cast(4 as int), cast('Este correo no esta registrado' as varchar(500));
	end if;
end;
$function$
;


-----------Procedimiento almacenado para crear usuarios de la APP----------------

CREATE OR REPLACE PROCEDURE public.crear_usuario(
		IN p_nombres_apellidos character varying,
		IN p_email character varying,
		IN p_google_id character varying
		)
LANGUAGE plpgsql
AS $procedure$

Begin
	insert into usuarios(
						nombre_apellidos,
						email,
						google_id
						)values
						(
						p_nombres_apellidos,
						p_email,
						p_google_id
						);

COMMIT;
END;
$procedure$
;


call crear_usuario('John Vera','jveram10@uteq.edu.ec','45345fgsdfgf44');

update usuarios set email  = 'jveram10@uteq.edu.ec' where  id_usuarios  = 1

select * from usuarios u 


select verification_google('jveram10@uteq.edu.ec');


---------funcion que devuelve los datos del usuario------------

CREATE OR REPLACE FUNCTION public.auth_data(p_email character varying)
 RETURNS TABLE(userc character varying)
 LANGUAGE plpgsql
AS $function$
begin
	return query
	select cast(id_usuarios as varchar(500)) as userp  from usuarios where email  = p_email;
end;
$function$
;


select auth_data('Prueba@uteq.edu.ec');



----------------------------- Procedimiento para crear grupos--------------

select * from grupos g

CREATE OR REPLACE PROCEDURE public.sp_crear_grupos(
		IN p_titulo character varying,
		IN p_descripcion character varying,
		IN p_id_user character varying
		)
LANGUAGE plpgsql
AS $procedure$

Begin
	insert into grupos (
						titulo,
						descripcion,
						id_usuarios
						)values
						(
						p_titulo,
						p_descripcion,
						cast(p_id_user as int)
						);

COMMIT;
END;
$procedure$
;

call sp_crear_grupos('Proyecto Cuestionarios','Proyecto Cuestionarios para la UTEQ','1');

call sp_crear_grupos('Proyecto Tareas2','Proyecto Tareas para la distribuidas','1');

call sp_crear_grupos('Proyecto Tareas3','Proyecto Tareas para la distribuidas','1');
call sp_crear_grupos('Proyecto Tareas4','Proyecto Tareas para la distribuidas','58040a90-9fa3-4f2e-9ad9-7289d9e66a26');
call sp_crear_grupos('Proyecto Tareas5','Proyecto Tareas para la distribuidas','58040a90-9fa3-4f2e-9ad9-7289d9e66a26');
call sp_crear_grupos('Proyecto Tareas6','Proyecto Tareas para la distribuidas','58040a90-9fa3-4f2e-9ad9-7289d9e66a26');
call sp_crear_grupos('Proyecto Tareas7','Proyecto Tareas para la distribuidas','58040a90-9fa3-4f2e-9ad9-7289d9e66a26');

select * from usuarios u 


--------------funcion que retorne los grupos que cree ese usario---------

CREATE OR REPLACE FUNCTION public.fu_grupos_usuario(p_idu character varying)
 RETURNS TABLE(r_id_grupo integer, r_fecha_creacion character varying, r_titulo character varying, r_descripcion character varying)
 LANGUAGE plpgsql
AS $function$
begin
	return query
	select id_grupos, cast(date(fecha_creacion) as varchar(50)) as fecha_creacion ,g.titulo ,g.descripcion 
	from grupos g
	where g.id_usuarios  = cast(p_idu as int);
end;
$function$
;

--drop FUNCTION fu_grupos_usuario

--delete from grupos

--select * from grupos g 

--select id_grupos , cast(date(fecha_creacion) as varchar(50)) as fecha_creacion ,g.titulo ,g.descripcion from grupos g
--where cast(g.id_usuarios as varchar(800)) = '58040a90-9fa3-4f2e-9ad9-7289d9e66a26'


select fu_grupos_usuario('1')


-----------------------------------listar tareas-------------------------
--------------funcion que retorne las tareas de X grupo que cree ese usario---------

CREATE OR REPLACE FUNCTION public.fu_tareas_usuario(p_idu character varying, p_id_grupo int)
 RETURNS TABLE(r_id_tareas integer , r_titulo character varying, 
 				r_descripcion character varying, r_fecha_creacion character varying,
 				r_completada bool, r_importante bool)
 LANGUAGE plpgsql
AS $function$
begin
	return query
	select id_tareas ,t.titulo ,t.descripcion ,cast(date(fecha_creacion) as varchar(50)) as fecha_creacion,
		completada , importante
	from tareas t
	where t.id_usuarios = cast(p_idu as int)
	and t.id_grupos = p_id_grupo ;
end;
$function$
;

/*
select id_tareas ,t.titulo ,t.descripcion ,cast(date(fecha_creacion) as varchar(50)) as fecha_creacion,
		completada , importante
	from tareas t
	where cast(t.id_usuarios as varchar(800)) = '58040a90-9fa3-4f2e-9ad9-7289d9e66a26'
	and t.id_grupos = 15 ;
*/
--select * from tareas

select * from fu_tareas_usuario('1',2);


----------------------------- Procedimiento para crear tareas--------------

--select * from tareas

CREATE OR REPLACE PROCEDURE public.sp_crear_tareas(
		IN p_titulo character varying,
		IN p_descripcion character varying,
		in p_importante bool,
		IN p_id_user character varying,
		in p_id_grupos integer
		)
LANGUAGE plpgsql
AS $procedure$

Begin
	insert into tareas (
						titulo,
						descripcion,
						importante,
						id_usuarios,
						id_grupos
						)values
						(
						p_titulo,
						p_descripcion,
						p_importante,
						cast(p_id_user as int),
						p_id_grupos
						);

COMMIT;
END;
$procedure$
;


call sp_crear_tareas('Hacer un crud ','Proyecto Tareas para login',false,'1',1);
call sp_crear_tareas('Hacer un crud2 ','Proyecto Tareas para login',false,'1',2);
call sp_crear_tareas('Hacer un crud3 ','Proyecto Tareas para login',false,'1',2);


-----------------------------Procedimiento para modicar tarea--------------

CREATE OR REPLACE PROCEDURE public.sp_modificar_tarea(
		IN p_titulo character varying,
		IN p_descripcion character varying,
		in p_importante bool,
		in p_id_tareas integer
		)
LANGUAGE plpgsql
AS $procedure$

Begin
	update tareas set titulo=p_titulo, 
					descripcion = p_descripcion, 
					importante = p_importante 
	where  id_tareas = p_id_tareas;
COMMIT;
END;
$procedure$
;


select * from tareas

--update tareas set titulo='Hola como estas', descripcion = 'hola como estas', importante = true 
--where  id_tareas = 4

call sp_modificar_tarea('Hola como estas','hola como estas',false,4);



----------------------------- Procedimiento para eliminar tarea--------------

CREATE OR REPLACE PROCEDURE public.sp_eliminar_tarea(
		IN id integer
		)
LANGUAGE plpgsql
AS $procedure$

Begin
	delete from tareas where id_tareas = id;
COMMIT;
END;
$procedure$
;


delete from tareas where id_tareas = 3;





