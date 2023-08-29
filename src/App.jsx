import { useEffect, useState } from "react";

function App() {
  
  const [ Listatarefas, setListaTarefas] = useState([]); //variável da lista de tarefas que irá armazenar as tarefas dentro de uma array, que começará vazio
  const [ tarefa, setTarefa] = useState({id: '', texto :""});//Tarefa em si, a que estiver sendo digitada no input//Foi criado um objeto para que consiga excluir a tarefa

  function AddTarefa(){
    if ( tarefa.tarefa !== '')
    setListaTarefas([...Listatarefas, tarefa])//Quando clicar no btn o setListaTarefas terá seu valor igual a tudo que vier antes do listatarefas mais a nova tarefa do input
                                             //Spread operator
  }
  //Limpando o input após adicionar a tarefa
  useEffect (()=>{
    setTarefa ({id:'', texto:''})}, [Listatarefas])
    //Quando listarefas for alterado, ou seja, quando for adicionado uma tarefa a lista, o setTarefa será zerado
    //Zerando o setTarefa é necessário colocar o value do input como tarefa, pois quem altera a tarefa é o setTarefa, ou seja, se o setTarefa muda o tarefa muda
    //Com isso, o input será limpo, pois seu value é tarefa que está sendo mudado pelo setTarefa que está zerado

  function Excluirtarefa(id){  //Passa o id do elemento que será buscado pelo filter
    const novaLista = Listatarefas.filter((tarefa) => tarefa.id !== id) //Será criado uma nova lista em que a antiga lista será passado um filtro que irá prcurar em todas as tarefas a id que foi passada no button, a tarefa que possuir o mesmo id que foi passado no button é excluida, a que estiver diferente mantém, pois não foi clicado nessa tarefa.
    setListaTarefas (novaLista)//Agora a setListaTarefas terá seu valor como a novalista que será injetado na listatarefas.
  }
  return (
    <>
      <header>
        <h1>To-Do List</h1>
      </header>
        <div>
          <input type="text" name="tarefa" value={tarefa.texto} placeholder="Add your task" onChange={(e)=> setTarefa({ id:Math.random(), texto:e.target.value})} /*quando o valor do input mudar a cada clique, será chamado o setTarefa que o valor do setTarefa será o valor do input, e com isso é possível mudar o valor da const tarefa.*//>
          <button onClick={AddTarefa}>Add</button>
        </div>
        <div>
          <ul>
            {Listatarefas.map((item, index) => (
              <li key={index}>{item.texto} <button onClick={ () => Excluirtarefa(item.id)}>Excluir</button></li>//.map serve para percorrer o listatarefas que é um array (igual usando o for)
              //em que cada item do array percorrido ele terá um identificador único (index) e seu conteúdo (item)
              //E cada item do array será colocado dentro de uma li, em que seu identificador único (index) será a key (parecido com um id) e o conteúdo da li será o valor de item
              //Portanto, é possível ter vários conteúdos iguais (item), mas não index iguais
              //Com isto, o .map é melhor que o for, pois ele irá percorrer o array somente quando um index diferente dos que não estão exibidos for criado
            ))}
          </ul>
        </div>
    </>
  );
}
/*
  useEffect (()=> {
  alert("Aconteceu algo")
}) Desta maneira será dado um alert toda vez que um evento acontecer (click)
  useEffect (()=>{
  alert("Página carregou"), []
) Desta maneira será dado um alert na primeira vez que a página for carregada
  useEffect (()=>{
  alert("ListaTarefas foi alterado"), [Listatarefas]
) Desta maneira será dado um alert quando o listatarefas for alterado
*/
export default App;