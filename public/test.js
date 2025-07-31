console.log('✅ Test JavaScript chargé !');
alert('Test JavaScript fonctionne !');

function testClick() {
    console.log('🖱️ Test de clic !');
    alert('Clic fonctionne !');
}

// Exposer la fonction globalement
window.testClick = testClick; 