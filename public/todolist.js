$(() => {

    function refreshlist(){
        $('#tasklist').empty()

        $.get(
            '/todos',
            (data) => {
                
                for(let task of data){
                    console.log(task)
                    $('#tasklist').append(
                        $('<li>').text(task.name )

                    )
                    .append(
                        $('<p>').text('Description: ' + task.description)
                    )
                    .append(
                        $('<button>').attr('class','del').text('DEL').click(()=> {
                            
                        removetask(task.id);    
                         }) 
                    )
                }
            }
        )
    }


    async function removetask(elem){
        console.log(elem)
        let deletetodo = await $.ajax({
            type :'DELETE',
            // url:`/todos/${elem.data('task.id')}`
            url:'/todos/'+elem
        })
        
        refreshlist();
    }
    

    $('#addtask').click(()=>
    {
        $.post(
            '/todos',
            {
                name: $('#newtask').val(),
                description: $('#desc').val()
            },
            // (data)=>{
            //     if(data.success==true){
            //         refreshlist()
            //     }
            // }

            (data) => {
                refreshlist()
            }


        )
    })

    refreshlist()
})