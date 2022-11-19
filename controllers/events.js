const { response } = require("express");
const Evento = require("../models/Evento");
const mongoose = require("mongoose");

//Funcion para Devolver Todos los Datos
const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  return res.json({
    ok: true,
    eventos,
  });
};

//Funcion para Crear un Evento
const crearEvento = async (req, res = response) => {
  //Verificar que tenga el evento.
  const evento = new Evento(req.body);
  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

//Funcion para Actualizar un Evento
const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoId);
    console.log({ evento });
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No Tiene privilegios de editar evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      {
        new: true,
      }
    );

    //Evento Atualizado
    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

//Funcion para Borrar un Evento
const borrarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "No Exite Evento con esa Id",
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No Tiene privilegios de Eliminar evento",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    //Evento Borrado
    res.json({
      ok: true,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

module.exports = {
  getEventos,
  actualizarEvento,
  crearEvento,
  borrarEvento,
};
