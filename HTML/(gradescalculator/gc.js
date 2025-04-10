function computeGrade() {
    const midtermGrade = parseFloat(document.getElementById('mGrade').value);
    const finalGrade = parseFloat(document.getElementById('fGrade').value);
    const finalGradeOutput = (midtermGrade + finalGrade) / 2;
    document.getElementById('Output').value = finalGradeOutput.toFixed(2);

    let remarks;
    if (finalGradeOutput >= 100) remarks = '1.0';
    else if (finalGradeOutput >= 98) remarks = '1.1';
    else if (finalGradeOutput >= 95) remarks = '1.2';
    else if (finalGradeOutput >= 93) remarks = '1.3';
    else if (finalGradeOutput >= 90) remarks = '1.5';
    else if (finalGradeOutput >= 89) remarks = '1.6';
    else if (finalGradeOutput >= 87) remarks = '1.8';
    else if (finalGradeOutput >= 86) remarks = '1.9';
    else if (finalGradeOutput >= 85) remarks = '2.0';
    else if (finalGradeOutput >= 84) remarks = '2.1';
    else if (finalGradeOutput >= 83) remarks = '2.2';
    else if (finalGradeOutput >= 82) remarks = '2.3';
    else if (finalGradeOutput >= 81) remarks = '2.4';
    else if (finalGradeOutput >= 80) remarks = '2.5';
    else if (finalGradeOutput >= 79) remarks = '2.6';
    else if (finalGradeOutput >= 78) remarks = '2.7';
    else if (finalGradeOutput >= 77) remarks = '2.8';
    else if (finalGradeOutput >= 76) remarks = '2.9';
    else if (finalGradeOutput >= 75) remarks = '3.0';
    else if (finalGradeOutput >= 70) remarks = '5.0';
    else remarks = 'Failed';

    document.getElementById('remarks').value = remarks;
}