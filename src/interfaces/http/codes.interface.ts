
export enum C100 {
  /**
   * 100 : Se utiliza para indicar que la primera parte de la petición del navegador se ha recibido correctamente
   */
  Continue = 100,
  /**
   * 101 : El servidor acepta el cambio de protocolo propuesto por el navegador(puede ser por ejemplo un cambio de HTTP 1.0 a HTTP 1.1)
   */
  Switching_Protocols = 101,

  /**
   * 102 : El servidor está procesando la petición del navegador pero todavía no ha terminado(esto evita que el navegador piense que la petición se ha perdido cuando no recibe ninguna respuesta)
   */
  ProcessingWebDAV___RFC_2518 = 102,

  /**
   * 103 : Se va a reanudar una petición POST o PUT que fue abortada previamente
   */
  Checkpoint = 103,
}


export enum C200 {
  /**
   * 200 : Respuesta estándar para peticiones correctas
   */
  OK = 200,

  /**
   * 201 : La petición ha sido completada y ha resultado en la creación de un nuevo recurso
   */
  Created = 201,

  /**
   * 202 : La petición ha sido aceptada para procesamiento, pero este no ha sido completado. La petición eventualmente puede no haber sido satisfecha, ya que podría ser no permitida o prohibida cuando el procesamiento tenga lugar
   */
  Accepted = 202,

  /**
   * 203 : La petición se ha completado con éxito, pero su contenido no se ha obtenido de la fuente originalmente solicitada sino de otro servidor
   */
  Non_Authoritative_Information_desde_HTTP_1_1 = 203,

  /**
   * 204 : La petición se ha completado con éxito pero su respuesta no tiene ningún contenido (la respuesta puede incluir información en sus cabeceras HTTP)
   */
  No_Content = 204,

  /**
   * 205 : La petición se ha completado con éxito, pero su respuesta no tiene contenidos y además, el navegador tiene que inicializar la página desde la que se realizó la petición (este código es útil por ejemplo para páginas con formularios cuyo contenido debe borrarse después de que el usuario lo envíe)
   */
  Reset_Content = 205,

  /**
   * 206 : La petición servirá parcialmente el contenido solicitado. Esta característica es utilizada por herramientas de descarga como wget para continuar la transferencia de descargas anteriormente interrumpidas, o para dividir una descarga y procesar las partes simultáneamente
   */
  Partial_Content = 206,

  /**
   * 207 : El cuerpo del mensaje que sigue es un mensaje XML y puede contener algún número de códigos de respuesta separados, dependiendo de cuántas sub-peticiones sean hechas
   */
  Multi_Status_Multi_Status_WebDAV = 207,

  /**
   * 208 : El listado de elementos DAV ya se notificó previamente, por lo que no se van a volver a listar
   */
  Already_Reported_WebDAV = 208,

}


export enum C300 {
  /**
   * 300 : Indica opciones múltiples para el URI que el cliente podría seguir.Esto podría ser utilizado, por ejemplo, para presentar distintas opciones de formato para video, listar archivos con distintas extensiones o word sense disambiguation
   */
  Multiple_Choices = 300,

  /**
   Es301 : ta y todas las peticiones futuras deberían ser dirigidas a la URL dada.* 
   */
  Moved_Permanently = 301,
  /**
   * 302 : Este es el código de redirección más popular, pero también un ejemplo de las prácticas de la industria contradiciendo el estándar. La especificación HTTP/1.0 (RFC 1945) requería que el cliente realizara una redirección temporal (la frase descriptiva original fue "Moved Temporarily"), pero los navegadores populares lo implementaron como 303 See Other. Por tanto, HTTP/1.1 añadió códigos de estado 303 y 307 para eliminar la ambigüedad entre ambos comportamientos. Sin embargo, la mayoría de aplicaciones web y bibliotecas de desarrollo aún utilizan el código de respuesta 302 como si fuera el 303
   */
  Found_antes_Moved_Temporarily = 302,

  /**
   * 303 : La respuesta a la petición puede ser encontrada bajo otra URI utilizando el método GET
   */
  See_Other_desde_HTTP_1_1 = 303,

  /**
   * 304 : Indica que la petición a la URL no ha sido modificada desde que fue requerida por última vez. Típicamente, el cliente HTTP provee un encabezado como If-Modified-Since para indicar una fecha y hora contra la cual el servidor pueda comparar. El uso de este encabezado ahorra ancho de banda y reprocesamiento tanto del servidor como del cliente
   */
  Not_Modified = 304,

  /**
   * 305 : Muchos clientes HTTP (como Mozilla3​ e Internet Explorer) no se apegan al estándar al procesar respuestas con este código, principalmente por motivos de seguridad
   */
  Use_Proxy_desde_HTTP_1_1 = 305,

  /**
   * 306 : Este código se utilizaba en las versiones antiguas de HTTP pero ya no se usa (aunque está reservado para usos futuros)
   */
  Switch_Proxy = 306,

  /**
   * 307 : Se trata de una redirección que debería haber sido hecha con otra URI, sin embargo aún puede ser procesada con la URI proporcionada. En contraste con el código 303, el método de la petición no debería ser cambiado cuando el cliente repita la solicitud. Por ejemplo, una solicitud POST tiene que ser repetida utilizando otra petición POST
   */
  Temporary_Redirect_desde_HTTP_1_1 = 307,

  /**
   * 308 : El recurso solicitado por el navegador se encuentra en otro lugar y este cambio es permanente. A diferencia del código 301, no se permite cambiar el método HTTP para la nueva petición (así por ejemplo, si envías un formulario a un recurso que ha cambiado de lugar, todo seguirá funcionando bien)
   */
  Permanent_Redirect = 308,
}


export enum C400 {
  /**
   * 400 : El servidor no procesará la solicitud, porque no puede, o no debe, debido a algo que es percibido como un error del cliente (ej: solicitud malformada, sintaxis errónea, etc). La solicitud contiene sintaxis errónea y no debería repetirse
   */
  Bad_Request = 400,

  /**
   * 401 : Similar al 403 Forbidden, pero específicamente para su uso cuando la autentificación es posible pero ha fallado o aún no ha sido provista. Vea autenticación HTTP básica y Digest access authentication
   */
  Unauthorized = 401,

  /**
   * 402 : La intención original era que este código pudiese ser usado como parte de alguna forma o esquema de Dinero electrónico o micropagos, pero eso no sucedió, y este código nunca se utilizó
   */
  Payment_Required = 402,

  /**
   * 403 : La solicitud fue legal, pero el servidor rehúsa responderla dado que el cliente no tiene los privilegios para realizarla. En contraste a una respuesta 401 No autorizado, autenticarse previamente no va a cambiar la respuesta
   */
  Forbidden = 403,

  /**
   * 404 : Recurso no encontrado. Se utiliza cuando el servidor web no encuentra la página o recurso solicitado
   */
  Not_Found = 404,

  /**
   * 405 : Una petición fue hecha a una URI utilizando un método de solicitud no soportado por dicha URI; por ejemplo, cuando se utiliza GET en un formulario que requiere que los datos sean presentados vía POST, o utilizando PUT en un recurso de solo lectura
   */
  Method_Not_Allowed = 405,

  /**
   * 406 : El servidor no es capaz de devolver los datos en ninguno de los formatos aceptados por el cliente, indicados por éste en la cabecera "Accept" de la petición
   */
  Not_Acceptable = 406,

  /**
   * 407 : El servidor acepta la solicitud pero se requiere la autenticación del Proxy para que el servidor pueda procesarla
   */
  Proxy_Authentication_Required = 407,

  /**
   * 408 : El cliente falló al continuar la petición - excepto durante la ejecución de videos Adobe Flash cuando solo significa que el usuario cerró la ventana de video o se movió a otro. ref
   */
  Request_Timeout = 408,

  /**
   * 409 : Indica que la solicitud no pudo ser procesada debido a un conflicto con el estado actual del recurso que esta identifica
   */
  Conflict = 409,

  /**
   * 410 : Indica que el recurso solicitado ya no está disponible y no lo estará de nuevo. Debería ser utilizado cuando un recurso ha sido quitado de forma permanente. Si un cliente recibe este código no debería volver a solicitar el recurso en el futuro. Por ejemplo un buscador lo eliminará de sus índices y lo hará más rápidamente que utilizando un código 404
   */
  Gone = 410,

  /**
   * 411 : El servidor rechaza la petición del navegador porque no incluye la cabecera Content-Length adecuada
   */
  Length_Required = 411,

  /**
   * 412 : El servidor no es capaz de cumplir con algunas de las condiciones impuestas por el navegador en su petición
   */
  Precondition_Failed = 412,

  /**
   * 413 : La petición del navegador es demasiado grande y por ese motivo el servidor no la procesa
   */
  RequestEntity_Too_Large = 413,

  /**
   * 414 : La URI de la petición del navegador es demasiado grande y por ese motivo el servidor no la procesa (esta condición se produce en muy raras ocasiones y casi siempre porque el navegador envía como GET una petición que debería ser POST)
   */
  Request_URI_Too_Long = 414,

  /**
   * 415 : La petición del navegador tiene un formato que no entiende el servidor y por eso no se procesa
   */
  Unsupported_Media_Type = 415,

  /**
   * 416 : El cliente ha preguntado por una parte de un archivo, pero el servidor no puede proporcionar esa parte, por ejemplo, si el cliente preguntó por una parte de un archivo que está más allá de los límites del fin del archivo
   */
  Requested_Range_Not_Satisfiable = 416,

  /**
   * 417 : La petición del navegador no se procesa porque el servidor no es capaz de cumplir con los requerimientos de la cabecera Expect de la petición
   */
  Expectation_Failed = 417,

  /**
   * 418 : "Soy una tetera". Este código fue definido en 1998 como una inocentada, en el Protocolo de Transmisión de Hipertexto de Cafeteras (RFC-2324). No se espera que los servidores web implementen realmente este código de error, pero es posible encontrar sitios que devuelvan este código HTTP
   */
  I_m_a_teapot = 418,

  /**
   * 422 : La solicitud está bien formada pero fue imposible seguirla debido a errores semánticos
   */
  Unprocessable_Entity_WebDAV___RFC_4918 = 422,

  /**
   * 423 : El recurso al que se está teniendo acceso está bloqueado
   */
  Locked_WebDAV___RFC_4918 = 423,

  /**
   * 424 : La solicitud falló debido a una falla en la solicitud previa
   */
  Failed_Dependency_WebDAV_RFC_4918 = 424,

  /**
   * 425 : Definido en los drafts de WebDav Advanced Collections, pero no está presente en "Web Distributed Authoring and Versioning (WebDAV) Ordered Collections Protocol" (RFC 3648)
   */
  Unassigned = 425,

  /**
   * 426 : El cliente debería cambiarse a TLS/1.0
   */
  Upgrade_Required_RFC_7231 = 426,

  /**
   * 428 : El servidor requiere que la petición del navegador sea condicional (este tipo de peticiones evitan los problemas producidos al modificar con PUT un recurso que ha sido modificado por otra parte)
   */
  Precondition_Required = 428,

  /**
   * 429 : Hay muchas conexiones desde esta dirección de internet
   */
  Too_Many_Requests = 429,

  /**
   * 431 : El servidor no puede procesar la petición porque una de las cabeceras de la petición es demasiado grande. Este error también se produce cuando la suma del tamaño de todas las peticiones es demasiado grande
   */
  Request_Header_Fields_Too_Large = 431,

  /**
   * 449 : Una extensión de Microsoft: La petición debería ser reintentada después de hacer la acción apropiada
   */
  Microsoft_Error = 449,

  /**
   * 451 : El contenido ha sido eliminado como consecuencia de una orden judicial o sentencia emitida por un tribunal 
   */
  Unavailable_for_Legal_Reasons = 451,
}


export enum C500 {
  /**
   * 500 : Es un código comúnmente emitido por aplicaciones empotradas en servidores web, mismas que generan contenido dinámicamente, por ejemplo aplicaciones montadas en IIS o Tomcat, cuando se encuentran con situaciones de error ajenas a la naturaleza del servidor web
   */
  Internal_Server_Error = 500,

  /**
   * 501 : El servidor no soporta alguna funcionalidad necesaria para responder a la solicitud del navegador (como por ejemplo el método utilizado para la petición)
   */
  Not_Implemented = 501,

  /**
   * 502 : El servidor está actuando de proxy o gateway y ha recibido una respuesta inválida del otro servidor, por lo que no puede responder adecuadamente a la petición del navegador
   */
  Bad_Gateway = 502,

  /**
   * 503 : El servidor no puede responder a la petición del navegador porque está congestionado o está realizando tareas de mantenimiento
   */
  Service_Unavailable = 503,

  /**
   * 504 : El servidor está actuando de proxy o gateway y no ha recibido a tiempo una respuesta del otro servidor, por lo que no puede responder adecuadamente a la petición del navegador
   */
  Gateway_Timeout = 504,

  /**
   * 505 : El servidor no soporta o no quiere soportar la versión del protocolo HTTP utilizada en la petición del navegador
   */
  HTTP_Version_Not_Supported = 505,

  /**
   * 506 : El servidor ha detectado una referencia circular al procesar la parte de la negociación del contenido de la petición
   */
  Variant_Also_Negotiates_RFC_2295 = 506,

  /**
   * 507 : El servidor no puede crear o modificar el recurso solicitado porque no hay suficiente espacio de almacenamiento libre
   */
  Insufficient_Storage_WebDAV___RFC_4918 = 507,

  /**
   * 508 : La petición no se puede procesar porque el servidor ha encontrado un bucle infinito al intentar procesarla
   */
  Loop_Detected_WebDAV = 508,

  /**
   * 509 : Límite de ancho de banda excedido. Este código de estatus, a pesar de ser utilizado por muchos servidores, no es oficial
   */
  Bandwidth_Limit_Exceeded = 509,

  /**
   * 510 : La petición del navegador debe añadir más extensiones para que el servidor pueda procesarla
   */
  Not_Extended_RFC_2774 = 510,

  /**
   * 511 : El navegador debe autenticarse para poder realizar peticiones (se utiliza por ejemplo con los portales cautivos que te obligan a autenticarte antes de empezar a navegar)
   */
  Network_Authentication_Required = 511,

  /**
   * 512 : Este error prácticamente es inexistente en la red, pero indica que el servidor está en una operación de actualizado y no puede tener conexión
   */
  Not_updated = 512,

  /**
   * 521 : Este error sale cuando la versión no es compatible con tu hardware
   */
  Version_Mismatch = 521,
}

export const HTTP = {
  /**
   * Error100 : 1xx: Respuestas informativas
   */
  C100,
  /**
   * Error200 : 2xx: Peticiones correctas
   */
  C200,
  /**
   * Error300 : 3xx: Redirecciones
   */
  C300,
  /**
   * Error400 : 4xx: Errores del cliente
   */
  C400,
  /**
   * Error500 : 5xx: Errores de servidor
   */
  C500,
}