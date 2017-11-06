var socket = io()

socket.on('connect', function () {
    console.log('Connected to server')
})

socket.on('disconnet', function () {
    console.log('Disconnected from server')

})

socket.on('userGone', function (message) {
    console.log(message)

})


socket.on('newMessage', function (message) {

    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`)

    jQuery('#message-list').append(li)
})

socket.on('newLocationMessage', function (locationMessage) {
    console.log(locationMessage)

    var li = jQuery('<li></li>')
    var a = jQuery('<a target="blank">My Current Location</a>')

    li.text(`${locationMessage.from}: `)
    a.attr('href', locationMessage.url)
    li.append(a)
    jQuery('#message-list').append(li)
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault()

    socket.emit('createMessage', {
        from: 'Wyyx',
        text: $('[name=message]').val()
    }, function (acknow) {
        console.log(acknow)
    })
})

var locationButton = jQuery('#location-button')
locationButton.on('click', function (location) {

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position)

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })

    }, function () {
        console.log('Unable to fetch location')

    })

})