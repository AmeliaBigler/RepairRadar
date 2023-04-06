const natural = require('natural');
const { TfIdf, BayesClassifier } = natural
const tickets = require("./ticketExample.json")


const labeledDocuments = tickets

const tfidf = new TfIdf()
labeledDocuments.forEach(doc => tfidf.addDocument(doc.text))

const importantTerms = new Set()
labeledDocuments.forEach(doc => {
    tfidf.listTerms(tfidf.documents.length - 1)
        .slice(0, 10)
        .forEach(term => importantTerms.add(term.term))
})


const classifier = new BayesClassifier()
labeledDocuments.forEach(doc => classifier.addDocument(doc.text, doc.label))
classifier.train()

const unlabeledDocuments = [
    'My gasket is missing',
    'My crankshaft is missing',
]

const tokenizer = new natural.WordTokenizer()
const scoredDocuments = unlabeledDocuments.map(doc => {
    const terms = tokenizer.tokenize(doc)
    let score = 0
    terms.forEach(term => {
        if (importantTerms.has(term)) {
            const termScore = tfidf.tfidf(term, tfidf.documents.length - 1)
            score += termScore
        }
    })
    return { text: doc, score: score }
})

scoredDocuments.sort((a, b) => b.score - a.score)
const topDocuments = scoredDocuments.slice(0, 5)


const classifiedDocs = unlabeledDocuments.map(doc => {
    return classifier.classify(doc)
})

console.log(classifier.getClassifications('My gasket is missing'))

console.log(classifiedDocs)
console.log(importantTerms)
console.log(topDocuments)

classifier.save('classifier.json')