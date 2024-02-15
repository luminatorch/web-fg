export class Score {
    constructor(documentId, patientName, createdAt, { fibrillation, age, strokeScale, tHemorrhage, glucose, aspects, injury, nasoenteral }, totalScore) {
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
        if (Object.keys(this).includes(option)) {
            this[option] = value;
        }
    }
}