{
    // method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),  // convert form data into json , content would be key and value would be data filled in the form 
                success: function (data) {

                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost); // to add the data on the top of the list
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
           
            <small>
                <a href="/posts/destroy/${post.id}" class="delete-post-button">X</a>
            </small>
         
              ${post.content}
            <small>
               ${post.user.name}
            </small>
        </p>
        <div class="post-comments">
           
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add Comments" id="" required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" name="" value="Post">
                </form>
               
                <div class="post-comments-list">
                    <ul id = "post-comments-${post._id}">
                       
                    </ul>
    
    
                </div>
        </div>
    </li>
    `);
    }


    createPost();
}