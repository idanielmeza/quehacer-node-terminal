require('colors');
const { guardarDB,leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,pausa, leerInput , listadoTareasBorrar,confirmar,mostrarListadoCheckList} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async()=>{
    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        //Establecert las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {

        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                //Crear opcion
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            
            case 2:
                // console.log(tareas.listadoArr);
                tareas.listadoCompleto();
                break;
            
            case 3:
                tareas.listado();
                break;

            case 4:
                tareas.listado(false);
                break;

            case 5:
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case 6:
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id!=0){
                    const ok = await confirmar('Estas seguro que deseas borrar?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('La tarea se ha borrado');
                    }
                }
                break;

            
        
        }
        
        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt != 0);
    
    // pausa();


}

main();