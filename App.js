import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
const Cristiano_Ronaldo = [
  { pregunta: '¿Cuanto hijos tiene el bicho siuuuuuuu?',
    opciones: ['10', '5', '0', '12'], correcta: 1 },
  { pregunta: '¿Cuantos mundiales tiene el bicho?',
    opciones: ['3', '1', '0', '3'], correcta: 2 },
  { pregunta: '¿En que club no jugo Cristiano Ronaldo?',
    opciones: ['Real Madrid', 'Emelec', 'Manchester United', 'Juventus'], correcta: 1 },
  { pregunta: '¿Cuantos años tiene el bicho siuuuuu?',
    opciones: ['39', '38', '100', '41'], correcta: 3 },
  { pregunta: '¿Cual es un apodo de Cristiano Ronaldo?',
    opciones: ['Capitan Portugal', 'Camellonaldo', 'Cris Valencia', 'Diestro'], correcta: 1 },
];

const Brawl_Stars = [
  { pregunta: '¿Cual de estos brawlers es de calidad epicaa?',
    opciones: ['Rico', 'Morti', 'Ash', 'Goku'], correcta: 2 },
  { pregunta: '¿Cuantos creditos son necesarios para desbloquear un brawler legendario?',
    opciones: ['3600', '1200', '1500', '2000'], correcta: 0 },
  { pregunta: '¿Cual de estos brawlers es un francotirador?',
    opciones: ['Cris', 'Grom', 'Moe', 'Piper'], correcta: 3 },
  { pregunta: '¿Cuantos goles se necesitan para ganar en hockey brawl?',
    opciones: ['2', '4', '3', '1'], correcta: 2 },
  { pregunta: '¿El brawler carl es de calidad?',
    opciones: ['Super especial', 'Especial', 'Epico', 'Mitico'], correcta: 0 },
];
export default function App() {
  const [pantalla, setPantalla] = useState(1);      // pantalla visible (1 a 5)
  const [tema, setTema] = useState(null);           // 'videojuegos' o 'anime'
  const [indice, setIndice] = useState(0);          // pregunta actual (0 a 4)
  const [seleccion, setSeleccion] = useState(null); // opción tocada (null = sin responder)
  const [correctas, setCorrectas] = useState(0);    // aciertos = puntaje
  const [incorrectas, setIncorrectas] = useState(0);

  // Elegimos el arreglo de preguntas según el tema (condicional)
  let preguntas = [];
  if (tema === 'Cristiano_Ronaldo') {
    preguntas = Cristiano_Ronaldo;
  } else if (tema === 'Brawl_Stars') {
    preguntas = Brawl_Stars;
  }
  const actual = preguntas[indice]; // pregunta que se muestra

  // ← Los pasos 4 a 8 se pegan aquí, uno debajo de otro
  function elegirTema(t) {
    setTema(t);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);
    if (t === 'Crsitiano_Ronaldo') {
      setPantalla(3);
    } else {
      setPantalla(4);
    }
  }

  function responder(i) {
    setSeleccion(i); // guardamos qué opción tocó
    if (i === actual.correcta) {
      setCorrectas(correctas + 1);
    } else {
      setIncorrectas(incorrectas + 1);
    }
  }

  function siguiente() {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
      setSeleccion(null);
    } else {
      setPantalla(5);
    }
  }

  function volverAJugar() {
    setTema(null);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);
    setPantalla(2);
  }
  if (pantalla === 1) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.logo}>🎮</Text>
        <Text style={styles.titulo}>QuizZone</Text>
        <Text style={styles.subtitulo}>¡Demuestra cuánto sabes!</Text>
        <Button title="Comenzar" onPress={() => setPantalla(2)} />
      </View>
    );
  }

  if (pantalla === 2) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Selecciona un tema</Text>
        <View style={styles.espacio}>
          <Button title="⚽ Cristiano Ronaldo" onPress={() => elegirTema('Cristiano_Ronaldo')} />
        </View>
        <View style={styles.espacio}>
          <Button title="⭐ Brawl Stars" onPress={() => elegirTema('Brawl_Stars')} />
        </View>
        <View style={styles.espacio}>
          <Button title="Atrás" color="#7a869a" onPress={() => setPantalla(1)} />
        </View>
      </View>
    );
  }
  if (pantalla === 3 || pantalla === 4) {
    let mensaje = '';
    if (seleccion !== null) {
      if (seleccion === actual.correcta) {
        mensaje = '¡Correcto! 🎉';
      } else {
        mensaje = 'Incorrecto. La respuesta era: ' + actual.opciones[actual.correcta];
      }
    }

    return (
      <View style={styles.contenedor}>
        <Text style={styles.tema}>
          {tema === 'Cristiano_Ronaldo' ? '⚽ Cristiano Ronaldo' : '⭐ Brawl Stars'}
        </Text>
        <Text style={styles.contador}>
          Pregunta {indice + 1} de {preguntas.length} · Puntaje: {correctas}
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.pregunta}>{actual.pregunta}</Text>
        </View>

        <View style={styles.espacio}>
          <Button title={'A. ' + actual.opciones[0]}
            onPress={() => responder(0)} disabled={seleccion !== null} />
        </View>
        <View style={styles.espacio}>
          <Button title={'B. ' + actual.opciones[1]}
            onPress={() => responder(1)} disabled={seleccion !== null} />
        </View>
        <View style={styles.espacio}>
          <Button title={'C. ' + actual.opciones[2]}
            onPress={() => responder(2)} disabled={seleccion !== null} />
        </View>
        <View style={styles.espacio}>
          <Button title={'D. ' + actual.opciones[3]}
            onPress={() => responder(3)} disabled={seleccion !== null} />
        </View>

        {seleccion !== null && (
          <View>
            <Text style={seleccion === actual.correcta ? styles.bien : styles.mal}>
              {mensaje}
            </Text>
            <Button
              title={indice < preguntas.length - 1 ? 'Siguiente' : 'Ver resultados'}
              color="#239455"
              onPress={siguiente}
            />
          </View>
        )}
      </View>
    );
  }
  let mensajeFinal = '';
  if (correctas >= 4) {
    mensajeFinal = '¡Excelente! Tienes grandes conocimientos 🏆';
  } else if (correctas >= 3) {
    mensajeFinal = '¡Muy bien! Casi lo logras 👏';
  } else {
    mensajeFinal = '¡Sigue practicando! 💪';
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.logo}>🏆</Text>
      <Text style={styles.titulo}>¡Juego terminado!</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>Tu puntaje</Text>
        <Text style={styles.puntaje}>{correctas} / {preguntas.length}</Text>
      </View>

      <View style={styles.fila}>
        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Correctas</Text>
          <Text style={styles.miniValor}>{correctas}</Text>
        </View>
        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Incorrectas</Text>
          <Text style={styles.miniValor}>{incorrectas}</Text>
        </View>
      </View>

      <Text style={styles.final}>{mensajeFinal}</Text>
      <Button title="Volver a jugar" onPress={volverAJugar} />
    </View>
  );
}   // ← llave que cierra la función App()
const styles = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#eef4ff' },
  logo: { fontSize: 64, textAlign: 'center' },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#173b83', marginBottom: 10 },
  subtitulo: { fontSize: 16, textAlign: 'center', color: '#596579', marginBottom: 25 },
  espacio: { marginBottom: 12 },
  tema: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#2457c5' },
  contador: { fontSize: 14, textAlign: 'center', color: '#596579', marginVertical: 8 },
  tarjeta: { backgroundColor: '#ffffff', padding: 18, borderRadius: 12, marginBottom: 16 },
  pregunta: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#202b3c' },
  bien: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#239455', marginVertical: 10 },
  mal: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#c33c3c', marginVertical: 10 },
  etiqueta: { fontSize: 14, textAlign: 'center', color: '#596579' },
  puntaje: { fontSize: 42, fontWeight: 'bold', textAlign: 'center', color: '#2457c5' },
  fila: { flexDirection: 'row', justifyContent: 'space-between' },
  mini: { width: '48%', backgroundColor: '#ffffff', padding: 14, borderRadius: 12 },
  miniValor: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#202b3c' },
  final: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 18 },
});
