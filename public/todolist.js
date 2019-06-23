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
                    // .append(
                    //     $('<br>')
                    // )
                    .append(
                        $('<p>').text('Description: ' + task.description)
                    )
                    .append(
                        $('<button>').attr('class','del').text('DEL').click(()=> {
                            
                        //     $(this).parent().remove();
                        //     console.log($(this).parent())
                        //     // refreshlist()
                            
                        // deleteitem();
                        
                        removetask(task.id);
                        
                        
                            
                         })
                        
                        
                    )
                }
            }
        )
    }

    // $('.del').on('click',function(){
    //     $(this).parent().remove();
    //     console.log($(this).parent())
    // })

//     function deleteitem(){
//         // adda common class to all the buttons
//     let deleteBtn = document.getElementsByClassName("del");
//     // converting html collection to array, to use array methods
//     Array.prototype.slice.call(deleteBtn).forEach(function(item) {
//     // iterate and add the event handler to it
//     item.addEventListener("click", function(e) {
//         e.target.parentNode.remove()
//     });

// })
//     }


    async function removetask(elem){
        console.log(elem)
        let deletetodo = await $.ajax({
            type :'DELETE',
            // url:`/todos/${elem.data('task.id')}`
            url:'/todos/'+elem
        })
        // elem.remove();
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