export class Score {
    constructor(documentId, patientName, { fibrillation, age, strokeScale, tHemorrhage, glucose, aspects, injury, nasoenteral }, createdAt, totalScore) {
        this.documentId = documentId;
        this.patientName = patientName;
        this.score = {
            fibrillation,
            age,
            strokeScale,
            tHemorrhage,
            glucose,
            aspects,
            injury,
            nasoenteral
          };
        this.createdAt = createdAt;
        this.totalScore = totalScore;
        
    }

    updateOption(option, value) {
        if (this.score.hasOwnProperty(option)) {
            this.score[option] = value;
        } else {
            this[option] = value;
        }
    }
}