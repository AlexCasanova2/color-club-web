import type { IconType } from "react-icons";
import {
  IoCameraOutline,
  IoCheckmarkDoneOutline,
  IoColorPaletteOutline,
  IoPeopleOutline,
  IoPodiumOutline,
  IoSendOutline,
} from "react-icons/io5";

const stages = [
  {
    icon: IoPeopleOutline,
    title: "El club reúne al grupo",
    text: "Una persona crea un club privado y comparte la invitación. Pueden entrar hasta 12 miembros activos.",
    note: "Quien entra después de crear un reto participa a partir del siguiente.",
    tone: "orange",
  },
  {
    icon: IoColorPaletteOutline,
    title: "El reto decide el color",
    text: "Puede ser manual y compartido, aleatorio para todos o aleatorio e individual. El reto comienza en cuanto se lanza.",
    note: "Duraciones disponibles: de 30 minutos a una semana.",
    tone: "lavender",
  },
  {
    icon: IoCameraOutline,
    title: "Cada persona construye su collage",
    text: "La app reserva 2, 4, 6, 8, 10 o 12 huecos. Puedes cambiar tus fotos mientras el collage siga pendiente.",
    note: "El collage debe estar completo para poder enviarlo.",
    tone: "yellow",
  },
  {
    icon: IoSendOutline,
    title: "Enviar significa terminar",
    text: "Al confirmar, el collage queda bloqueado. Si el tiempo termina antes de completarlo, queda descalificado.",
    note: "Si todos terminan antes, el reto puede avanzar sin esperar al límite.",
    tone: "blue",
  },
  {
    icon: IoCheckmarkDoneOutline,
    title: "La votación revela las propuestas",
    text: "Con tres o más collages válidos, quienes entregaron pueden emitir un único voto y nunca por su propia propuesta.",
    note: "Con uno o dos collages válidos, el resultado se resuelve sin votación.",
    tone: "green",
  },
  {
    icon: IoPodiumOutline,
    title: "Los votos mueven el ranking",
    text: "Cada voto suma un punto y ordena la clasificación de la temporada activa del club.",
    note: "La app muestra la temporada actual, no un histórico navegable.",
    tone: "pink",
  },
] as const satisfies readonly {
  icon: IconType;
  title: string;
  text: string;
  note: string;
  tone: string;
}[];

export function HowItWorksTour() {
  return (
    <section className="tour shell" aria-label="Recorrido completo por un reto">
      <ol>
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <li
              className={`tour-stage tour-stage--${stage.tone}`}
              id={`paso-${index + 1}`}
              key={stage.title}
            >
              <div className="tour-stage__number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="tour-stage__copy">
                <Icon aria-hidden="true" />
                <h2>{stage.title}</h2>
                <p>{stage.text}</p>
                <strong>{stage.note}</strong>
              </div>
              <div className="tour-stage__swatch" aria-hidden="true" />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
