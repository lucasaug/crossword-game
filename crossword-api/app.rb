require "sinatra"

get "/crossword/new" do
    content_type :json
    [{
        value: "lucas",
        clue: "quem fez iss",
        startPosition: {
            x: 2,
            y: 2
        },
        direction: 2,
    },
    {
        value: "lupa",
        clue: "negoç de aumentar a vista",
        startPosition: {
            x: 0,
            y: 4
        },
        direction: 1,
    },
    {
        value: "sopa",
        clue: "molhim de toma hmm",
        startPosition: {
            x: 0,
            y: 4
        },
        direction: 2,
    },
    {
        value: "ciencia",
        clue: "negoç de estuda os negoç",
        startPosition: {
            x: 6,
            y: 0
        },
        direction: 2,
    }].to_json
end
