require "sinatra"

get "/crossword/new" do
    content_type :json
    {
        across: [
            {
                value: "lucas",
                clue: "quem fez iss",
                startPosition: {
                    x: 2,
                    y: 4
                },
            },
            {
                value: "sopa",
                clue: "molhim de toma hmm",
                startPosition: {
                    x: 0,
                    y: 5
                },
            },
            {
                value: "ciencia",
                clue: "negoç de estuda os negoç",
                startPosition: {
                    x: 7,
                    y: 0
                },
            }
        ],
        down: [
            {
                value: "lupa",
                clue: "negoç de aumentar a vista",
                startPosition: {
                    x: 2,
                    y: 4
                },
            }
        ]
    }.to_json
end
