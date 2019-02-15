$(document).ready(() => {
    $.ajax({
        url: "/api/gameId",
        type: "GET",

        success(data) {
            const gameId = data.gameId;
            console.log(data);

            $('.btn-create').on('click', (event) => {
                event.preventDefault();
                console.log("click");
                $.ajax({
                    url: `/api/game`,
                    type: "POST",
                    data: {
                        gameId: gameId,
                        first: $('.first').val(),
                        second: $('.second').val(),
                        third: $('.third').val(),
                        fourth: $('.fourth').val()
                    },
                    success(data) {
                        console.log(data);                        
                        window.location.href = `/games/${gameId}`;
                    },
                    error(_xhr, _statusCode, error) {
                        window.location.href = `/`
                        console.log(error);

                    }
                })
            });




        },
        error(_xhr, _statusCode, error) {
            console.log(error);

        }
    })
});