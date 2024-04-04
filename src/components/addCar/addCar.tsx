import "./addCar.scss"

const addCar = (props: Props) => {
  return (
    <div className='addCar'>
        <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>X</span>
        <h1>Agregar Nuevo Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={nombre}
              placeholder="nombre"
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Apellido Paterno</label>
            <input
              type="text"
              name="apellido_Paterno"
              value={apellido_Paterno}
              placeholder="Apellido Paterno"
              onChange={(e) => setApellido_Paterno(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Apellido Materno</label>
            <input
              type="text"
              name="apellido_Materno"
              value={apellido_Materno}
              placeholder="Apellido Materno"
              onChange={(e) => setApellido_Materno(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="correoElectronico"
              value={correoElectronico}
              placeholder="Correo Electrónico"
              onChange={(e) => setCorreoElectronico(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Contraseña </label>
            <input
              type={showPassword ? "text" : "password"}
              name="contrasena"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              InputAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className="item">
            <label>Celular</label>
            <input
              type="tel"
              name="celular"
              value={celular}
              placeholder="Celular"
              onChange={(e) => setCelular(e.target.value)}
            />
          </div>
          <div className="item">
            <label>País</label>
            <select
              id="pais"
              name="pais"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
            >
              <option value="">Seleccionar Pais</option>
              <option value="Peru">Perú</option>
              <option value="Argentina">Argentina</option>
              <option value="Brasil">Brasil</option>
            </select>
          </div>
          <div className="item">
            <label>Imagen</label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default addCar