`
<tr>
<th scope="row">Round 1</th>
<td>
  <input type="number" class="form-control">
</td>
<td>
    <input type="number" class="form-control">
</td>
<td>
    <input type="number" class="form-control">
</td>
<td>
    <input type="number" class="form-control">
</td>
</tr>
`

const caculateScore = function () {
    let sum = [0, 0, 0, 0, 0];
    $('input[order="first"').each(function () {
        sum[1] += Number($(this).val());
    });
    $('input[order="second"').each(function () {
        sum[2] += Number($(this).val());
    });
    $('input[order="third"').each(function () {
        sum[3] += Number($(this).val());
    });
    $('input[order="fourth"').each(function () {
        sum[4] += Number($(this).val());
    });
    sum[0] = sum[1] + sum[2] + sum[3] + sum[4];
    $('.sum-of-scores').text(`Sum of Scores(${sum[0]})`);
    $('.sum-first').text(sum[1]);
    $('.sum-second').text(sum[2]);
    $('.sum-third').text(sum[3]);
    $('.sum-fourth').text(sum[4]);
}

$(document).ready(() => {
    console.log('Document is ready');
    const gameId = window.location.pathname.split('/')[2];
   

    $.ajax({
        url: `/games/getById/${gameId}`,
        type: "GET",
        success(data) {
            const {
                first,
                second,
                third,
                fourth
            } = data.names;
            console.log(data);
            $('#first-player').text(first);
            $('#second-player').text(second);
            $('#third-player').text(third);
            $('#fourth-player').text(fourth);

            $.ajax({
                url: `/games/rounds/${gameId}`,
                type: "GET",
                success(data) {
                    const {
                        rounds
                    } = data;
                    let numberRounds = rounds.length;
                    let appendString = "";
                    rounds.forEach(round => {
                        appendString +=
                            `
                        <tr>
                        <th scope="row">Round ${round.roundId}</th>
                        <td>
                          <input type="number" class="form-control" value="${round.first}" round-id="${round.roundId}" order="first">
                        </td>
                        <td>
                            <input type="number" class="form-control" value="${round.second}" round-id="${round.roundId}" order="second">
                        </td>
                        <td>
                            <input type="number" class="form-control" value="${round.third}" round-id="${round.roundId}" order="third">
                        </td>
                        <td>
                            <input type="number" class="form-control" value="${round.fourth}" round-id="${round.roundId}" order="fourth">
                        </td>
                        </tr>
                        `;
                    });
                    $('.rounds').append(appendString);
                    caculateScore();
                    $('button').on('click', (event) => {
                        event.preventDefault();

                        $.ajax({
                            url: `/games/rounds/add`,
                            type: "POST",
                            data: {
                                gameId,
                                roundId: ++numberRounds,
                                first: 0,
                                second: 0,
                                third: 0,
                                fourth: 0
                            },
                            success(data) {
                                console.log(data);
                                $('.rounds').append(
                                    `
                                    <tr>
                                    <th scope="row">Round ${numberRounds}</th>
                                    <td>
                                      <input type="number" class="form-control" round-id="${numberRounds}" order="first">
                                    </td>
                                    <td>
                                        <input type="number" class="form-control"  round-id="${numberRounds}" order="second">
                                    </td>
                                    <td>
                                        <input type="number" class="form-control"  round-id="${numberRounds}" order="third">
                                    </td>
                                    <td>
                                        <input type="number" class="form-control"  round-id="${numberRounds}" order="fourth">
                                    </td>
                                    </tr>
                                    `

                                );
                                window.location.href = `/games/${gameId}`;
                            },
                            error(_xhr, _statusCode, error) {
                                console.log(error);
                            }
                        })


                    });

                    $('input').on('change', function (event) {
                        event.preventDefault();
                        const roundId = $(this).attr('round-id');
                        const first = $(`input[round-id="${roundId}"][order="first"]`).val();
                        const second = $(`input[round-id="${roundId}"][order="second"]`).val();
                        const third = $(`input[round-id="${roundId}"][order="third"]`).val();
                        const fourth = $(`input[round-id="${roundId}"][order="fourth"]`).val();
                        $.ajax({
                            url: `/games/rounds/update`,
                            type: "PUT",
                            data: {
                                gameId,
                                roundId,
                                first,
                                second,
                                third,
                                fourth
                            },
                            success(data) {
                                console.log("update success");
                                caculateScore();

                            },
                            error(_xhr, _statusCode, error) {
                                console.log(error);

                            }
                        })
                    });



                },
                error(_xhr, _statusCode, error) {
                    console.log(error);

                }
            });










        },
        error(_xhr, _statusCode, error) {
            console.log(error);

        }
    })
});