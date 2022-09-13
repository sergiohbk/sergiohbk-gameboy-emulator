import React, { useState } from "react";
import "./Modal.css";

export function Modal() {
  const [modalClose, setModalClose] = useState(true);

  if (modalClose)
    return (
      <div className="modal" onClick={() => setModalClose(false)}>
        <div className="modalContainer">
          <div className="modalHeader">
            <h1>Instrucciones</h1>
          </div>
          <div className="modalBody">
            <h3>Como jugar al emulador</h3>
            <p>
              Para jugar al emulador debes seleccionar un juego con el botón
              <strong> seleccionar juego</strong> (solo funcionan juegos de
              gameboy)
            </p>
            <p>
              luego presionar la pestaña arriba de la gameboy (como en la
              gameboy real)
            </p>
            <h3>Controles</h3>
            <ul>
              <li>
                ↑ - <i>W</i>
              </li>
              <li>
                ↓ - <i>S</i>
              </li>
              <li>
                ← - <i>A</i>
              </li>
              <li>
                → - <i>D</i>
              </li>
              <li>
                A - <i>J</i>
              </li>
              <li>
                B - <i>K</i>
              </li>
              <li>
                Select - <i>Backspace</i>
              </li>
              <li>
                Start - <i>Enter</i>
              </li>
            </ul>

            <h3>Caracteristicas y otra información</h3>
            <ul>
              <li>
                Guardar partida está implementado, puedes guardar tu partida en
                los juegos, al cerrar la ventana guardara esa partida en los
                datos locales del navegador.
              </li>
              <li>
                Aun no se ha implementado el sistema de apagado y reiniciado de
                la consola, por lo tanto para jugar a otro juego es necesario
                refrescar la pestaña
              </li>
              <li>
                Tampoco se ha adaptado aun a versión movil o tablet, la consola
                y los juegos funcionarán, pero los botones aun no.
              </li>
              <li>
                Para ver el juego desde más cerca, puedes hacer zoom con el
                navegador, en el futuro se implementara un reescalado
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  else return;
}
