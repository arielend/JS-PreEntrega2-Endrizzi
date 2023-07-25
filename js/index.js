//DECLARACIÓN DE CLASES
class Paciente {
    constructor (apellido, nombre, documento, edad, sexo, password){
        this.apellido = apellido,
        this.nombre = nombre,
        this.documento = documento,
        this.edad = edad,
        this.sexo = sexo,
        this.password = password
    }
}

class Turno {
    constructor(especialidad, fecha, hora, Paciente){
        this.especialidad = especialidad,
        this.fecha = fecha,
        this.hora = hora,
        this.Paciente = Paciente,
        this.atendido = false,
        this.cancelado = false
    }

    marcarAtendido(){
        this.atendido = true;
    }

    cancelarTurno(){
        this.cancelado = true;
    }
}


//DECLARACIÓN DE ARRAYS
const pacientes = [];
const turnos = [];


//DECLARACIÓN DE VARIABLES
let continuarCargaPaciente = true;
let continuarCargaTurno = true;


//VARIABLES INICIADAS POR DEFECTO PARA PRUEBA
//Agrega un objeto paciente al array de pacientes
const pacienteDefault = new Paciente("Endrizzi", "Ariel", "26803849", 44, "M", "1234");
pacientes.push(pacienteDefault);


//DECLARACIÓN DE FUNCIONES

//Elimina espacios en blanco, coloca la primer letra del string en mayuscula y el resto en minuscula
function capitalizar(str) {
    let texto = str.trim();
    texto = texto.charAt(0).toUpperCase() + (texto.slice(1)).toLowerCase();
    return texto;
}

//Elimina espacios en blanco y convierte el texto a minuscula 
function formatear(str){
    let texto = str.trim();
    texto = texto.toLowerCase();
    return texto;
}

//Envía un mensaje al usuario y devuelve true cuando el usuario apreta el boton Cancelar del prompt 
// Desde la función que llama a cancelar() un IF ejecuta el return para salir del sistema si la misma devuelve true
function promptCancelado(input){
    if(input === null){
        alert("Saliendo del sistema");
        return true;
    }    
}

//Función para el registro de pacientes
function altaPaciente(){
    let apellido = prompt("Ingrese su apellido.");
    let intentos = 0;
    if(promptCancelado(apellido)){
        return;
    }
    while(apellido == ""){
        if(intentos > 2){
            alert("Ha excedido el número de intentos permitidos");
            return;
        }
        apellido = prompt("Su apellido es un dato necesario para el registro. Por favor, ingrese su apellido.");
        intentos += 1;
    }
    intentos = 0;
    apellido = capitalizar(apellido);

    let nombre = prompt ("Ingrese su nombre.");
    if (promptCancelado(nombre)){
        return;
    }
    while(nombre == ""){
        if(intentos > 2){
            alert("Ha excedido el número de intentos permitidos");
            return;
        }
        nombre = prompt("Su nombre es un dato necesario para el registro. Por favor, ingrese su nombre.");
        intentos += 1;
    }
    intentos = 0;
    nombre = capitalizar(nombre);
    
    let documento = prompt("Ingrese su numero de documento sin puntos ni espacios.");
    if(promptCancelado(documento)){
        return;
    }
    while(documento == ""){
        if(intentos > 2){
            alert("Ha excedido el número de intentos permitidos");
            return;
        }
        nombre = prompt("Su documento es un dato necesario para el registro. Por favor, ingrese su documento.");
        intentos += 1;
    }    
    while(isNaN(documento) || documento == ""){
        if(intentos > 2){
            alert("Ha excedido el número de intentos permitidos");
            return;
        }
        edad = prompt("Debe ingresar un valor y el mismo debe ser un numero.");
        intentos += 1;
    }
    intentos = 0;
    
    let edad = prompt("Ingrese su edad.");
    if (promptCancelado(edad)){
        return;
    }
    while(edad == ""){
        if(intentos > 2){
            alert("Ha excedido el número de intentos permitidos");
            return;
        }
        edad = prompt("Su edad es un dato necesario para el registro. Por favor, ingrese su edad.");
        intentos += 1;
    }
    while(isNaN(edad) || edad == ""){
        edad = prompt("Debe ingresar un valor y el mismo debe ser un numero");
        intentos += 1;
    }
    intentos = 0;
    
    let sexo = prompt("Ingrese M, F o X para el sexo.");
    if (promptCancelado(sexo)){
        return;
    }
    while(sexo == ""){
        if(intentos > 2){
            alert("Ha excedido el número de intentos permitidos");
            return;
        }
        sexo = prompt("Su sexo es un dato necesario para el registro.");
        intentos += 1;
    }
    sexo = formatear(sexo);
    while(sexo != "m" && sexo !="f" && sexo != "x"){
        if(intentos > 2){
            alert("Ha excedido el número de intentos permitidos");
            return;
        }
        sexo = prompt("Debe ingresar una opción valida. Ingrese M, F o X");
        intentos += 1;
        if (promptCancelado(sexo)){
            return;
        }
        else{
            sexo = formatear(sexo);
        }
    }
    intentos = 0;
    
    let password = prompt("Ahora vamos a crear una contraseña segura que pueda recordar. Debe contener al menos 8 caracteres.");
    if(promptCancelado(password)){
        return;
    }
    console.log(password.length);
    while(password == "" || password.length < 8){
        if(intentos > 2){
            alert("Ha excedido el número de intentos permitidos");
            return;
        }
        apellido = prompt("Debe crear una contraseña para poder acceder al sistema y la misma debe tener al menos 8 caracteres.");
        intentos += 1;
    }

    const PACIENTE = new Paciente(apellido, nombre, documento, edad, sexo, password);
    let confirmaAlta = prompt("Ingrese SI para confirmar el alta del paciente " + PACIENTE.apellido + " " + PACIENTE.nombre + " o NO para salir del sistema.");

    if(promptCancelado(confirmaAlta)){
        return;
    }
    else if(confirmaAlta === "SI"){
        pacientes.push(PACIENTE);
        alert("Paciente cargado correctamente.");
        return PACIENTE;
    }
    else if(confirmaAlta === "NO"){
        alert("Se cancelo el registro. Saliendo del sistema.");
        return false;
    }
    else{
        alert("Opción incorrecta. Vuelva a ingresar al sistema.");
        return false;
    }
}

//Función de login
//NO ESTA COMPLETA
function login(){

    let doc = (prompt("Ingrese su documento.")).toString();
    const enSesion = pacientes.find(
        (elemento) =>{return elemento.documento === doc}
        );
    
    if(enSesion === undefined){
        alert("El paciente no se encuentra registrado. Verifique los datos y vuelva a ingresar.");
        return;
    }

    let password = prompt("Ingrese su contraseña");
    if(enSesion.password === password){
        alert("Ingreso exitoso.");
        return enSesion;
    }
    else{
        alert("Contraseña incorrecta");
        return;
    }
}

//Función para acceder a solicitud de turnos
function accederAltaTurnos(pacienteEnSesion){
    let ingresaATurno = prompt("Ingrese SI para solicitar un turno.");
    if(promptCancelado(ingresaATurno)){
        return;
    }
    else if(ingresaATurno === "SI"){
        altaTurno(pacienteEnSesion);
        console.log(turnos);
    }
    else{
        alert("Opción incorrecta.");
        return;
    }
}

//Función para el alta de turnos
function altaTurno(paciente){
    let especialidad = prompt("Ingrese la especialidad para la cual desea el turno");
    let intentos = 0;
    if(promptCancelado(especialidad)){
        return;
    }
    while(especialidad == ""){
        if(intentos > 2){
            alert("Ha excedido el número de intentos permitidos");
            return;
        }
        especialidad = prompt("Debe ingresar una especialidad médica.");
        intentos += 1;
    }    
    especialidad = capitalizar(especialidad);
    intentos = 0;

    let fechaTurno = prompt("Ingrese la fecha del turno con formato DD/MM/AAAA");
    if(promptCancelado(fechaTurno)){
        return;
    }
    while(fechaTurno == ""){
        if(intentos > 2){
            alert("Ha excedido el número de intentos permitidos");
            return;
        }
        fechaTurno = prompt("Debe ingresar la fecha del turno.");
        intentos += 1;
    }
    intentos = 0;

    let horaTurno = prompt("Ingrese la hora del turno con formato HHMM");
    if(promptCancelado(horaTurno)){
        return;
    }
    while(horaTurno == ""){
        if(intentos > 2){
            alert("Ha excedido el número de intentos permitidos");
            return;
        }
        horaTurno = prompt("Debe ingresar la hora del turno.");
        intentos += 1;
    }
    intentos = 0;

    const TURNO = new Turno(especialidad, fechaTurno, horaTurno, paciente);
    let confirmaAlta = prompt("Ingrese SI para confirmar el turno para " + TURNO.especialidad + " del día " + TURNO.fecha + " a las " + TURNO.hora + ", para el paciente " + paciente.apellido);
    if(promptCancelado(confirmaAlta)){
        return;
    }
    else if(confirmaAlta === "SI"){
        turnos.push(TURNO);
        alert("Turno confirmado.");
        return TURNO;
    }
    else if(confirmaAlta === "NO"){
        alert("Se cancelo el alta del turno. Vuelva a ingresar para solicitarlo nuevamente.");
        return false;
    }
    else{
        alert("Opción incorrecta. Vuelva a ingresar al sistema.");
        return false;
    }
    
}

function inicioPrograma(){
    let accionInicio = prompt("Bienvenido al sistema de turnos. Ingrese R para registrarse o L para ingresar al sistema con su usuario");
    let pacienteEnSesion;

    if(promptCancelado(accionInicio)){
        return;
    }
    else if(accionInicio === "R"){
        pacienteEnSesion = altaPaciente();
        console.log(pacientes);
        if(pacienteEnSesion){
            accederAltaTurnos(pacienteEnSesion);
        }
    }    
    else if(accionInicio === "L"){
        pacienteEnSesion = login();

        if(pacienteEnSesion !== undefined){
            accederAltaTurnos(pacienteEnSesion);
        }
    }
    else{
        alert("Opcion incorrecta. Saliendo del sistema.");
        return;
    }
}

//INICIO DEL PROGRAMA

inicioPrograma();
alert("Gracias por usar el sistema de turnos. Presiones INGRESAR para volver a ejecutar el programa.");

