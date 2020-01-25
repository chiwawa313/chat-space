$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message__upper-info">
           <div class="message__upper-info__name">
             ${message.user_name}
           </div>
           <div class="message__upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="message__text">
           <div class="message__text__content">
             ${message.content}
           </div>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message__upper-info">
           <div class="message__upper-info__name">${message.user_name}</div>
           <div class="message__upper-info__date">${message.created_at}</div>
         </div>
         <div class="message__text">
           <div class="message__text__content">
             ${message.content}
           </div>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.main__message').append(html);    
    $('.main__message').animate({ scrollTop: $('.main__message')[0].scrollHeight});  
    $('.new_message')[0].reset();
    $(".btn").prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
});
})
var reloadMessages = function() { 
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  last_message_id = $('.message:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
     var insertHTML = '';
     $.each(messages, function(i, message) {
       insertHTML += buildHTML(message)
     });
     $('.main__message').append(insertHTML);
     $('.main__message').animate({ scrollTop: $('.main__message')[0].scrollHeight});
     $("#new_message")[0].reset();
     $(".btn").prop("disabled", false);
   }
  })
}
};
  setInterval(reloadMessages, 7000);

});

