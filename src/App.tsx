import { useState, useRef, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Truck, Clock, Download, X } from 'lucide-react';

export default function App() {
  // Estados para el simulador - CAMBIO A MÚLTIPLES SELECCIONES
  const [nombreCliente, setNombreCliente] = useState('');
  const [logoCliente, setLogoCliente] = useState<string | null>(null);
  
  // Array de vehículos seleccionados
  const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState<Array<{
    tipo: string;
    jornada: string;
    precio: number;
    cantidad: number;
  }>>([]);
  
  // Array de tramos de km seleccionados
  const [tramosSeleccionados, setTramosSeleccionados] = useState<Array<{
    nombre: string;
    valor: number;
  }>>([]);
  
  // Extras operativos - CAMBIO A ARRAY CON CANTIDAD
  const [extrasSeleccionados, setExtrasSeleccionados] = useState<Array<{
    concepto: string;
    precio: number;
    cantidad: number;
  }>>([]);
  
  const [otrosAjustes, setOtrosAjustes] = useState({ concepto: '', valor: '' });
  const [generandoPDF, setGenerandoPDF] = useState(false);
  
  const pageRef = useRef<HTMLDivElement>(null);

  // Datos de vehículos - Optimizado con useMemo
  const vehiculos = useMemo(() => [
    { tipo: "Tipo A (3 m³ – 1 pallet)", mediaJornada: "90", jornadaCompleta: "160", refuerzo: "80" },
    { tipo: "Tipo B (6 m³ – 2 pallets)", mediaJornada: "95", jornadaCompleta: "170", refuerzo: "90" },
    { tipo: "Tipo C (12 m³)", mediaJornada: "100", jornadaCompleta: "180", refuerzo: "100" },
    { tipo: "Tipo D (Carrozado)", mediaJornada: "120", jornadaCompleta: "220", refuerzo: "110" },
    { tipo: "Tipo E (Moto)", mediaJornada: "65", jornadaCompleta: "110", refuerzo: "50" },
    { tipo: "Tipo F (Bici)", mediaJornada: "55", jornadaCompleta: "90", refuerzo: "40" }
  ], []);

  const tramosKm = useMemo(() => [
    { nombre: "Tramo 1 (00–100 km)", valor: 0 },
    { nombre: "Tramo 2 (100–200 km)", valor: 10 },
    { nombre: "Tramo 3 (+200 km)", valor: 15 },
    { nombre: "Tramo 4 (+300 km)", valor: 20 }
  ], []);

  const extras = useMemo(() => [
    { concepto: "Hora extra", precio: "20 €/h" },
    { concepto: "Hora nocturna", precio: "5 €/h" },
    { concepto: "Mozo de almacén", precio: "140 €" },
    { concepto: "Jefe de tráfico", precio: "165 €" }
  ], []);

  const especiales = useMemo(() => [
    { concepto: "Festivos y domingos", detalle: "Suplemento adicional según zona" },
    { concepto: "Servicios urgentes", detalle: "Suplemento por activación inmediata" },
    { concepto: "Esperas prolongadas", detalle: "Aplicable según tiempo adicional" },
    { concepto: "Segunda persona", detalle: "Coste según mozo/ayudante" },
    { concepto: "Cambios de ruta", detalle: "Suplemento según impacto operativo" }
  ], []);

  const calcularTotal = () => {
    // Sumar todos los vehículos seleccionados
    let subtotal = vehiculosSeleccionados.reduce((sum, v) => sum + (v.precio * v.cantidad), 0);
    
    // Añadir todos los tramos de KM
    const tramosTotal = tramosSeleccionados.reduce((sum, t) => sum + t.valor, 0);
    subtotal += tramosTotal;
    
    // Añadir extras operativos
    let extrasTotal = 0;
    extrasSeleccionados.forEach(e => extrasTotal += e.precio * e.cantidad);
    
    const total = subtotal + extrasTotal + parseFloat(otrosAjustes.valor || '0');
    return total.toFixed(2);
  };

  // Nueva función para toggle de vehículo
  const handleSeleccionarTarifa = (tipo: string, jornada: string, precio: string) => {
    const yaSeleccionado = vehiculosSeleccionados.find(v => v.tipo === tipo && v.jornada === jornada);
    
    if (yaSeleccionado) {
      // Si ya está seleccionado, quitarlo
      setVehiculosSeleccionados(vehiculosSeleccionados.filter(v => !(v.tipo === tipo && v.jornada === jornada)));
    } else {
      // Si no está seleccionado, agregarlo
      setVehiculosSeleccionados([...vehiculosSeleccionados, {
        tipo,
        jornada,
        precio: parseFloat(precio),
        cantidad: 1
      }]);
    }
  };

  // Nueva función para verificar si un vehículo está seleccionado
  const esVehiculoSeleccionado = (tipo: string, jornada: string) => {
    return vehiculosSeleccionados.some(v => v.tipo === tipo && v.jornada === jornada);
  };

  // Nueva función para toggle de tramo de km
  const handleSeleccionarTramo = (nombre: string, valor: number) => {
    const yaSeleccionado = tramosSeleccionados.find(t => t.nombre === nombre);
    
    if (yaSeleccionado) {
      setTramosSeleccionados(tramosSeleccionados.filter(t => t.nombre !== nombre));
    } else {
      setTramosSeleccionados([...tramosSeleccionados, { nombre, valor }]);
    }
  };

  // Función para verificar si un tramo está seleccionado
  const esTramoSeleccionado = (nombre: string) => {
    return tramosSeleccionados.some(t => t.nombre === nombre);
  };

  // Funciones para actualizar cantidad y precio de vehículo
  const actualizarCantidadVehiculo = (tipo: string, jornada: string, cantidad: number) => {
    setVehiculosSeleccionados(vehiculosSeleccionados.map(v => 
      v.tipo === tipo && v.jornada === jornada ? { ...v, cantidad } : v
    ));
  };

  const actualizarPrecioVehiculo = (tipo: string, jornada: string, precio: number) => {
    setVehiculosSeleccionados(vehiculosSeleccionados.map(v => 
      v.tipo === tipo && v.jornada === jornada ? { ...v, precio } : v
    ));
  };

  const actualizarTipoVehiculo = (tipoAntiguo: string, jornadaAntigua: string, tipoNuevo: string) => {
    setVehiculosSeleccionados(vehiculosSeleccionados.map(v => 
      v.tipo === tipoAntiguo && v.jornada === jornadaAntigua ? { ...v, tipo: tipoNuevo } : v
    ));
  };

  const actualizarJornadaVehiculo = (tipo: string, jornadaAntigua: string, jornadaNueva: string) => {
    setVehiculosSeleccionados(vehiculosSeleccionados.map(v => 
      v.tipo === tipo && v.jornada === jornadaAntigua ? { ...v, jornada: jornadaNueva } : v
    ));
  };

  const eliminarVehiculo = (tipo: string, jornada: string) => {
    setVehiculosSeleccionados(vehiculosSeleccionados.filter(v => !(v.tipo === tipo && v.jornada === jornada)));
  };

  const eliminarTramo = (nombre: string) => {
    setTramosSeleccionados(tramosSeleccionados.filter(t => t.nombre !== nombre));
  };

  const agregarExtra = (concepto: string, precio: number) => {
    const yaSeleccionado = extrasSeleccionados.find(e => e.concepto === concepto);
    
    if (yaSeleccionado) {
      setExtrasSeleccionados(extrasSeleccionados.map(e => 
        e.concepto === concepto ? { ...e, cantidad: e.cantidad + 1 } : e
      ));
    } else {
      setExtrasSeleccionados([...extrasSeleccionados, {
        concepto,
        precio,
        cantidad: 1
      }]);
    }
  };

  const eliminarExtra = (concepto: string) => {
    setExtrasSeleccionados(extrasSeleccionados.filter(e => e.concepto !== concepto));
  };

  const generarPDF = async () => {
    if (!pageRef.current) return;
    
    setGenerandoPDF(true);
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const elemento = pageRef.current;
      const canvas = await html2canvas(elemento, { 
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: async (clonedDoc) => {
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el: any) => {
            const computedStyle = clonedDoc.defaultView?.getComputedStyle(el);
            if (!computedStyle) return;
            
            const hasUnsupportedColor = (color: string) => {
              return color && (color.includes('oklch') || color.includes('oklab') || color.includes('lch') || color.includes('lab'));
            };
            
            if (hasUnsupportedColor(computedStyle.color)) el.style.color = 'rgb(0, 0, 0)';
            if (hasUnsupportedColor(computedStyle.backgroundColor)) el.style.backgroundColor = 'transparent';
            if (hasUnsupportedColor(computedStyle.borderColor)) el.style.borderColor = 'rgb(0, 0, 0)';
          });
          
          // Convertir el logo del cliente a blanco directamente
          const logoClienteElement = clonedDoc.querySelector('img[alt="Logo del cliente"]');
          if (logoClienteElement && logoCliente) {
            try {
              // Crear un canvas temporal para procesar el logo
              const tempCanvas = clonedDoc.createElement('canvas');
              const img = new Image();
              img.crossOrigin = 'anonymous';
              
              // Usar promesa para cargar la imagen
              await new Promise<void>((resolve, reject) => {
                img.onload = () => {
                  tempCanvas.width = img.width;
                  tempCanvas.height = img.height;
                  const ctx = tempCanvas.getContext('2d');
                  if (!ctx) {
                    reject(new Error('No context'));
                    return;
                  }
                  
                  // Dibujar la imagen
                  ctx.drawImage(img, 0, 0);
                  
                  // Obtener los datos de píxeles
                  const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                  const data = imageData.data;
                  
                  // Convertir todos los píxeles a blanco manteniendo el canal alfa
                  for (let i = 0; i < data.length; i += 4) {
                    const alpha = data[i + 3];
                    if (alpha > 0) {
                      data[i] = 255;     // R
                      data[i + 1] = 255; // G
                      data[i + 2] = 255; // B
                    }
                  }
                  
                  ctx.putImageData(imageData, 0, 0);
                  
                  // Reemplazar el src de la imagen con el canvas procesado
                  (logoClienteElement as HTMLImageElement).src = tempCanvas.toDataURL('image/png');
                  resolve();
                };
                img.onerror = reject;
                img.src = logoCliente;
              });
            } catch (error) {
              console.error('Error al procesar el logo:', error);
              // Si falla, aplicar el filtro CSS como fallback
              (logoClienteElement as HTMLElement).style.filter = 'brightness(0) invert(1)';
            }
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Márgenes: superior e inferior más pequeños, laterales para centrado horizontal
      const marginX = 30;
      const marginTop = 30;
      
      let imgWidth = pdfWidth - marginX * 2;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Si la imagen es muy alta, ajustar para que quepa en la página
      const maxHeight = pdfHeight - marginTop - 30; // 30pt margen inferior
      if (imgHeight > maxHeight) {
        imgHeight = maxHeight;
        imgWidth = (canvas.width * imgHeight) / canvas.height;
      }

      // Centrar horizontalmente, pero alinear arriba verticalmente
      const posX = (pdfWidth - imgWidth) / 2;
      const posY = marginTop;  // ✅ BIEN: Alineado arriba

      pdf.addImage(imgData, 'PNG', posX, posY, imgWidth, imgHeight);

      const slug = nombreCliente
        ? '-' + nombreCliente.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '')
        : '';
      const fileName = `tarifario-ultima-milla-2026${slug}.pdf`;

      pdf.save(fileName);
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta de nuevo.');
    } finally {
      setGenerandoPDF(false);
    }
  };

  const handleLogoClienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoCliente(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const eliminarLogoCliente = () => {
    setLogoCliente(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Botón PDF flotante */}
      <button
        onClick={generarPDF}
        className="fixed top-4 right-4 z-50 bg-[#00C9CE] hover:bg-[#00C9CE]/90 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-opacity"
      >
        <Download className="h-4 w-4" />
        Descargar PDF
      </button>

      {/* Contenido que se capturará en el PDF */}
      <div ref={pageRef} className="max-w-[1200px] mx-auto bg-white shadow-lg">
        {/* HEADER */}
        <div className={`bg-[#000935] text-white py-4 px-6 ${generandoPDF ? 'rounded-t-lg' : ''}`}>
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Logo */}
              <div className="flex items-center">
                <img src="/logo-onus.png" alt="ONUS Express" className="h-[43px] w-auto" />
              </div>

              {/* Título central */}
              <div className="flex-1 text-center">
                <h1 className="tracking-wide mb-1">
                  {generandoPDF ? 'PRESUPUESTO ÚLTIMA MILLA 2026' : 'TARIFARIO ÚLTIMA MILLA 2026'}
                </h1>
                <p className="text-[#00C9CE] text-xs">Soluciones profesionales de reparto, rutas dedicadas y logística urbana</p>
              </div>

              {/* Logo del cliente */}
              <div className="w-[120px] flex items-center justify-end">
                {logoCliente && (
                  <img 
                    src={logoCliente} 
                    alt="Logo del cliente" 
                    className="h-auto w-auto max-h-[43px] max-w-[120px] object-contain" 
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {generandoPDF ? (
          /* VISTA DE PRESUPUESTO PARA PDF */
          <div className="max-w-[1200px] mx-auto p-8 space-y-6">
            
            {/* Información del cliente */}
            {nombreCliente && (
              <div className="border-3 border-[#00C9CE] rounded-lg p-6 bg-white flex items-center justify-between">
                <div className="text-[#00C9CE] text-sm">Cliente</div>
                <div className="text-lg text-[#000935]">{nombreCliente}</div>
              </div>
            )}

            {/* Desglose de servicios */}
            <div className="border-2 border-[#000935] rounded-lg overflow-hidden">
              <div className="bg-[#000935] text-white px-6 py-3">
                <h3 className="text-base">Desglose de Servicios</h3>
              </div>
              <div className="p-6 bg-white space-y-6">
                
                {/* Vehículos */}
                {vehiculosSeleccionados.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Truck className="h-4 w-4 text-[#00C9CE]" />
                      <h4 className="text-[#00C9CE] text-sm">Vehículos y Jornadas</h4>
                    </div>
                    <div>
                      <div className="grid grid-cols-12 gap-4 py-2 text-xs text-gray-600">
                        <div className="col-span-6">Concepto</div>
                        <div className="col-span-2 text-center">Cantidad</div>
                        <div className="col-span-2 text-right">Precio Unit.</div>
                        <div className="col-span-2 text-right">Subtotal</div>
                      </div>
                      {vehiculosSeleccionados.map((v, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-4 py-3 text-sm">
                          <div className="col-span-6">
                            <div className="text-[#000935]">{v.tipo}</div>
                            <div className="text-xs text-gray-500">{v.jornada}</div>
                          </div>
                          <div className="col-span-2 text-center">{v.cantidad}</div>
                          <div className="col-span-2 text-right">{v.precio.toFixed(2)} €</div>
                          <div className="col-span-2 text-right text-[#00C9CE] font-medium">
                            {(v.precio * v.cantidad).toFixed(2)} €
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tramos de kilometraje */}
                {tramosSeleccionados.length > 0 && (
                  <div>
                    <h4 className="text-[#000935] text-sm mb-3">Suplementos por Kilometraje</h4>
                    <div>
                      <div className="grid grid-cols-12 gap-4 py-2 text-xs text-gray-600">
                        <div className="col-span-10">Tramo</div>
                        <div className="col-span-2 text-right">Suplemento</div>
                      </div>
                      {tramosSeleccionados.map((t, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-4 py-3 text-sm">
                          <div className="col-span-10 text-[#000935]">{t.nombre}</div>
                          <div className="col-span-2 text-right text-[#00C9CE] font-medium">
                            {t.valor.toFixed(2)} €
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extras operativos */}
                {extrasSeleccionados.length > 0 && (
                  <div>
                    <h4 className="text-[#000935] text-sm mb-3">Extras Operativos</h4>
                    <div>
                      <div className="grid grid-cols-12 gap-4 py-2 text-xs text-gray-600">
                        <div className="col-span-6">Concepto</div>
                        <div className="col-span-2 text-center">Cantidad</div>
                        <div className="col-span-2 text-right">Precio Unit.</div>
                        <div className="col-span-2 text-right">Subtotal</div>
                      </div>
                      {extrasSeleccionados.map((e, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-4 py-3 text-sm">
                          <div className="col-span-6 text-[#000935]">{e.concepto}</div>
                          <div className="col-span-2 text-center">{e.cantidad}</div>
                          <div className="col-span-2 text-right">{e.precio.toFixed(2)} €</div>
                          <div className="col-span-2 text-right text-[#00C9CE] font-medium">
                            {(e.precio * e.cantidad).toFixed(2)} €
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Otros ajustes */}
                {otrosAjustes.valor !== '' && (
                  <div>
                    <h4 className="text-[#000935] text-sm mb-3">Otros Ajustes</h4>
                    <div>
                      <div className="grid grid-cols-12 gap-4 py-2 text-xs text-gray-600">
                        <div className="col-span-10">Concepto</div>
                        <div className="col-span-2 text-right">Importe</div>
                      </div>
                      <div className="grid grid-cols-12 gap-4 py-3 text-sm">
                        <div className="col-span-10 text-[#000935]">
                          {otrosAjustes.concepto || 'Suplementos adicionales (festivos, urgencias, esperas, etc.)'}
                        </div>
                        <div className={`col-span-2 text-right font-medium ${parseFloat(otrosAjustes.valor || '0') < 0 ? 'text-red-600' : 'text-[#00C9CE]'}`}>
                          {parseFloat(otrosAjustes.valor || '0').toFixed(2)} €
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Total */}
            <div className="border-3 border-[#00C9CE] rounded-lg p-6 bg-white">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[#000935] text-sm">Total del presupuesto</div>
                  <div className="text-xs text-gray-500">(sin IVA)</div>
                </div>
                <div className="text-[#00C9CE] text-4xl font-medium">{calcularTotal()} €</div>
              </div>
            </div>

            {/* Condiciones */}
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
                <h3 className="text-[#000935] text-base">Condiciones del Servicio</h3>
              </div>
              <div className="p-6 bg-white">
                <div className="text-sm text-gray-700 space-y-1">
                  <p>* Precios sin IVA</p>
                  <p>* Tarifas sujetas a disponibilidad de flota</p>
                  <p>* Kilometraje adicional según tramos establecidos</p>
                  <p>* Seguro: porcentaje variable según riesgo y mercancía</p>
                  <p>* Modificaciones de operativa pueden requerir ajuste de tarifa</p>
                  <p>* Facturación mensual por defecto</p>
                  <p>* Presupuesto válido durante 30 días desde la fecha de emisión</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-600 space-y-1 pt-4">
              <p>
                <strong>ONUS Express SL</strong> · www.onusexpress.com · Carrer d'Anselm Clavé, s/n, Nave 24 – PI Matacás – 08980 Sant Feliu de Llobregat, Barcelona · NIF: B72735277
              </p>
            </div>

          </div>
        ) : (
          /* VISTA NORMAL DEL TARIFARIO */
          <div className="max-w-[1200px] mx-auto p-6">

            {/* GRID DE 2 COLUMNAS */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

              {/* COLUMNA IZQUIERDA - TARJETAS DE INFORMACIÓN */}
              <div className="space-y-6">
                
                {/* Tarifas Media Jornada */}
                <Card className="border-2 border-[#000935]">
                  <CardHeader className="bg-[#000935] text-white rounded-t-lg">
                    <CardTitle className="text-white">Tarifas por Vehículo – Media Jornada</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo de Vehículo</TableHead>
                          <TableHead className="text-right">Precio</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vehiculos.map((v, idx) => (
                          <TableRow 
                            key={idx}
                            onClick={() => handleSeleccionarTarifa(v.tipo, 'Media Jornada', v.mediaJornada)}
                            className={`cursor-pointer transition-colors hover:bg-[#00C9CE]/10 ${
                              esVehiculoSeleccionado(v.tipo, 'Media Jornada') ? 'bg-[#00C9CE]/20 border-l-4 border-l-[#00C9CE]' : ''
                            }`}
                          >
                            <TableCell>{v.tipo}</TableCell>
                            <TableCell className="text-right">{v.mediaJornada} €</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Tarifas Jornada Completa */}
                <Card className="border-2 border-[#000935]">
                  <CardHeader className="bg-[#000935] text-white rounded-t-lg">
                    <CardTitle className="text-white">Tarifas por Vehículo – Jornada Completa</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo de Vehículo</TableHead>
                          <TableHead className="text-right">Precio</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vehiculos.map((v, idx) => (
                          <TableRow 
                            key={idx}
                            onClick={() => handleSeleccionarTarifa(v.tipo, 'Jornada Completa', v.jornadaCompleta)}
                            className={`cursor-pointer transition-colors hover:bg-[#00C9CE]/10 ${
                              esVehiculoSeleccionado(v.tipo, 'Jornada Completa') ? 'bg-[#00C9CE]/20 border-l-4 border-l-[#00C9CE]' : ''
                            }`}
                          >
                            <TableCell>{v.tipo}</TableCell>
                            <TableCell className="text-right">{v.jornadaCompleta} €</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Tarifas Refuerzos */}
                <Card className="border-2 border-[#00C9CE]">
                  <CardHeader className="bg-[#00C9CE]/10 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-[#00C9CE]" />
                      Tarifas por Vehículo – Refuerzos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo de Vehículo</TableHead>
                          <TableHead className="text-right">Precio</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vehiculos.map((v, idx) => (
                          <TableRow 
                            key={idx}
                            onClick={() => handleSeleccionarTarifa(v.tipo, 'Refuerzo', v.refuerzo)}
                            className={`cursor-pointer transition-colors hover:bg-[#00C9CE]/10 ${
                              esVehiculoSeleccionado(v.tipo, 'Refuerzo') ? 'bg-[#00C9CE]/20 border-l-4 border-l-[#00C9CE]' : ''
                            }`}
                          >
                            <TableCell>{v.tipo}</TableCell>
                            <TableCell className="text-right">{v.refuerzo} €</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Suplementos por KM */}
                <Card className="border-2 border-gray-200">
                  <CardHeader className="bg-gray-100 rounded-t-lg">
                    <CardTitle>Suplementos por Tramos de Kilometraje</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tramo</TableHead>
                          <TableHead className="text-right">Suplemento</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tramosKm.map((t, idx) => (
                          <TableRow 
                            key={idx}
                            onClick={() => handleSeleccionarTramo(t.nombre, t.valor)}
                            className={`cursor-pointer transition-colors hover:bg-[#00C9CE]/10 ${
                              esTramoSeleccionado(t.nombre) ? 'bg-[#00C9CE]/20 border-l-4 border-l-[#00C9CE]' : ''
                            }`}
                          >
                            <TableCell>{t.nombre}</TableCell>
                            <TableCell className="text-right">{t.valor} €</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Extras Operativos */}
                <Card className="border-2 border-gray-200">
                  <CardHeader className="bg-gray-100 rounded-t-lg">
                    <CardTitle>Extras Operativos</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Concepto</TableHead>
                          <TableHead className="text-right">Precio</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {extras.map((e, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{e.concepto}</TableCell>
                            <TableCell className="text-right">{e.precio}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Suplementos Especiales */}
                <Card className="border-2 border-[#00C9CE]">
                  <CardHeader className="bg-[#00C9CE]/10 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#00C9CE]" />
                      Suplementos Especiales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Concepto</TableHead>
                          <TableHead className="text-right">Detalle</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {especiales.map((s, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{s.concepto}</TableCell>
                            <TableCell className="text-right text-sm">{s.detalle}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Condiciones */}
                <Card className="border-2 border-[#000935]">
                  <CardHeader className="bg-[#000935] text-white rounded-t-lg">
                    <CardTitle className="text-white">Condiciones del Servicio</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-blue-50 p-4 rounded border border-blue-200 text-sm">
                      <ul className="space-y-2 ml-5 list-disc">
                        <li>Precios sin IVA</li>
                        <li>Tarifas sujetas a disponibilidad de flota</li>
                        <li>Kilometraje adicional según tramos establecidos</li>
                        <li>Seguro: porcentaje variable según riesgo y mercancía</li>
                        <li>Modificaciones de operativa pueden requerir ajuste de tarifa</li>
                        <li>Facturación mensual por defecto</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* COLUMNA DERECHA - SIMULADOR */}
              <Card className="border-2 border-[#00C9CE] shadow-lg">
                <CardHeader className="bg-[#00C9CE] text-white rounded-t-lg">
                  <CardTitle className="text-white text-center uppercase">SERVICIOS</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  
                  {/* Nombre del cliente */}
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <Label htmlFor="nombreCliente">Nombre del cliente</Label>
                    <Input
                      id="nombreCliente"
                      type="text"
                      placeholder="Ej: Amazon, DHL, Correos..."
                      value={nombreCliente}
                      onChange={(e) => setNombreCliente(e.target.value)}
                      className="border-[#00C9CE] focus-visible:ring-[#00C9CE]"
                    />
                  </div>

                  {/* Logo del cliente */}
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <Label htmlFor="logoCliente">Logo del cliente (.png)</Label>
                    {!logoCliente ? (
                      <div>
                        <Input
                          id="logoCliente"
                          type="file"
                          accept=".png"
                          onChange={handleLogoClienteChange}
                          className="border-[#00C9CE] focus-visible:ring-[#00C9CE]"
                        />
                        <p className="text-xs text-gray-600 mt-2">Sube un logo en formato PNG para mostrarlo en el header</p>
                      </div>
                    ) : (
                      <div className="bg-white border-2 border-[#00C9CE] rounded-lg p-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img src={logoCliente} alt="Logo del cliente" className="h-12 w-auto max-w-[100px] object-contain" />
                            <span className="text-sm text-gray-600">Logo cargado</span>
                          </div>
                          <button
                            onClick={eliminarLogoCliente}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Eliminar logo"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vehículos seleccionados */}
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <Label className="flex items-center justify-between">
                      <span>Vehículos seleccionados</span>
                      <span className="text-xs text-gray-600">Haz clic en las tablas</span>
                    </Label>
                    
                    {vehiculosSeleccionados.length === 0 ? (
                      <div className="text-sm text-gray-500 italic p-3 border border-dashed border-gray-300 rounded text-center">
                        No hay vehículos seleccionados.<br />
                        Haz clic en las filas de las tablas para seleccionar.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {vehiculosSeleccionados.map((v, idx) => (
                          <div key={idx} className="bg-white border-2 border-[#00C9CE] rounded-lg p-3 space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 space-y-2">
                                {/* Campo editable de tipo de vehículo */}
                                <div>
                                  <Label htmlFor={`tipo-${idx}`} className="text-xs">Tipo de vehículo</Label>
                                  <Input
                                    id={`tipo-${idx}`}
                                    type="text"
                                    value={v.tipo}
                                    onChange={(e) => actualizarTipoVehiculo(v.tipo, v.jornada, e.target.value)}
                                    className="border-[#00C9CE] focus-visible:ring-[#00C9CE] text-sm h-8"
                                    placeholder="Ej: Tipo A (3 m³ – 1 pallet)"
                                  />
                                </div>
                                
                                {/* Campo editable de jornada */}
                                <div>
                                  <Label htmlFor={`jornada-${idx}`} className="text-xs">Tipo de jornada</Label>
                                  <Input
                                    id={`jornada-${idx}`}
                                    type="text"
                                    value={v.jornada}
                                    onChange={(e) => actualizarJornadaVehiculo(v.tipo, v.jornada, e.target.value)}
                                    className="border-[#00C9CE] focus-visible:ring-[#00C9CE] text-sm h-8"
                                    placeholder="Ej: Media Jornada"
                                  />
                                </div>
                              </div>
                              
                              <button
                                onClick={() => eliminarVehiculo(v.tipo, v.jornada)}
                                className="text-red-500 hover:text-red-700 p-1"
                                title="Eliminar"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor={`cant-${idx}`} className="text-xs">Cantidad</Label>
                                <Input
                                  id={`cant-${idx}`}
                                  type="number"
                                  min="1"
                                  value={v.cantidad}
                                  onChange={(e) => actualizarCantidadVehiculo(v.tipo, v.jornada, parseInt(e.target.value) || 1)}
                                  className="border-[#00C9CE] focus-visible:ring-[#00C9CE] text-sm h-8"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`precio-${idx}`} className="text-xs">Precio €</Label>
                                <Input
                                  id={`precio-${idx}`}
                                  type="number"
                                  step="0.01"
                                  value={v.precio}
                                  onChange={(e) => actualizarPrecioVehiculo(v.tipo, v.jornada, parseFloat(e.target.value) || 0)}
                                  className="border-[#00C9CE] focus-visible:ring-[#00C9CE] text-sm h-8"
                                />
                              </div>
                            </div>
                            
                            <div className="text-right text-sm pt-1 border-t border-gray-200">
                              <span className="text-gray-600">Subtotal: </span>
                              <span className="font-medium text-[#00C9CE]">{(v.precio * v.cantidad).toFixed(2)} €</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tramos de km seleccionados */}
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <Label className="flex items-center justify-between">
                      <span>Tramos de kilometraje</span>
                      <span className="text-xs text-gray-600">Haz clic en las tablas</span>
                    </Label>
                    
                    {tramosSeleccionados.length === 0 ? (
                      <div className="text-sm text-gray-500 italic p-3 border border-dashed border-gray-300 rounded text-center">
                        No hay tramos seleccionados
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {tramosSeleccionados.map((t, idx) => (
                          <div key={idx} className="bg-white border-2 border-[#00C9CE] rounded-lg p-2 flex items-center justify-between text-sm">
                            <div className="flex-1">
                              <div className="font-medium text-[#000935]">{t.nombre}</div>
                              <div className="text-xs text-[#00C9CE]">+{t.valor} €</div>
                            </div>
                            <button
                              onClick={() => eliminarTramo(t.nombre)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Eliminar"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Extras operativos */}
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <div className="text-sm mb-2">
                      <strong>Extras operativos</strong>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id="horaExtra"
                          checked={extrasSeleccionados.some(e => e.concepto === "Hora extra")}
                          onChange={(e) => e.target.checked ? agregarExtra("Hora extra", 20) : eliminarExtra("Hora extra")}
                          className="mt-1"
                        />
                        <label htmlFor="horaExtra">Hora extra (+20 € por hora)</label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id="horaNocturna"
                          checked={extrasSeleccionados.some(e => e.concepto === "Hora nocturna")}
                          onChange={(e) => e.target.checked ? agregarExtra("Hora nocturna", 5) : eliminarExtra("Hora nocturna")}
                          className="mt-1"
                        />
                        <label htmlFor="horaNocturna">Hora nocturna (+5 € por hora)</label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id="mozo"
                          checked={extrasSeleccionados.some(e => e.concepto === "Mozo de almacén")}
                          onChange={(e) => e.target.checked ? agregarExtra("Mozo de almacén", 140) : eliminarExtra("Mozo de almacén")}
                          className="mt-1"
                        />
                        <label htmlFor="mozo">Mozo de almacén (+140 €)</label>
                      </div>
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id="jefeTrafico"
                          checked={extrasSeleccionados.some(e => e.concepto === "Jefe de tráfico")}
                          onChange={(e) => e.target.checked ? agregarExtra("Jefe de tráfico", 165) : eliminarExtra("Jefe de tráfico")}
                          className="mt-1"
                        />
                        <label htmlFor="jefeTrafico">Jefe de tráfico (+165 €)</label>
                      </div>
                    </div>

                    {/* Extras seleccionados con cantidad editable */}
                    {extrasSeleccionados.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {extrasSeleccionados.map((e, idx) => (
                          <div key={idx} className="bg-white border-2 border-[#00C9CE] rounded-lg p-3 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 text-sm">
                                <div className="font-medium text-[#000935]">{e.concepto}</div>
                                <div className="text-xs text-gray-600">{e.precio} € cada uno</div>
                              </div>
                              <button
                                onClick={() => eliminarExtra(e.concepto)}
                                className="text-red-500 hover:text-red-700 p-1"
                                title="Eliminar"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor={`extra-cant-${idx}`} className="text-xs">Cantidad</Label>
                                <Input
                                  id={`extra-cant-${idx}`}
                                  type="number"
                                  min="1"
                                  value={e.cantidad}
                                  onChange={(event) => {
                                    const nuevaCantidad = parseInt(event.target.value) || 1;
                                    setExtrasSeleccionados(extrasSeleccionados.map(ex => 
                                      ex.concepto === e.concepto ? { ...ex, cantidad: nuevaCantidad } : ex
                                    ));
                                  }}
                                  className="border-[#00C9CE] focus-visible:ring-[#00C9CE] text-sm h-8"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`extra-precio-${idx}`} className="text-xs">Precio €</Label>
                                <Input
                                  id={`extra-precio-${idx}`}
                                  type="number"
                                  step="0.01"
                                  value={e.precio}
                                  onChange={(event) => {
                                    const nuevoPrecio = parseFloat(event.target.value) || 0;
                                    setExtrasSeleccionados(extrasSeleccionados.map(ex => 
                                      ex.concepto === e.concepto ? { ...ex, precio: nuevoPrecio } : ex
                                    ));
                                  }}
                                  className="border-[#00C9CE] focus-visible:ring-[#00C9CE] text-sm h-8"
                                />
                              </div>
                            </div>
                            
                            <div className="text-right text-sm pt-1 border-t border-gray-200">
                              <span className="text-gray-600">Subtotal: </span>
                              <span className="font-medium text-[#00C9CE]">{(e.precio * e.cantidad).toFixed(2)} €</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Otros ajustes */}
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <div className="text-sm mb-2">
                      <strong>Otros ajustes</strong>
                      <span className="block text-xs text-gray-600 mt-1">(festivos, urgencias, esperas, descuentos, etc.)</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="otrosAjustesConcepto" className="text-xs">Concepto</Label>
                        <Input
                          id="otrosAjustesConcepto"
                          type="text"
                          placeholder="Ej: Descuento especial, festivo..."
                          value={otrosAjustes.concepto}
                          onChange={(e) => setOtrosAjustes({ ...otrosAjustes, concepto: e.target.value })}
                          className="border-[#00C9CE] focus-visible:ring-[#00C9CE] text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="otrosAjustesValor" className="text-xs">
                          Importe €
                          <span className="block text-xs text-gray-500">(usa - para descuentos: -50)</span>
                        </Label>
                        <Input
                          id="otrosAjustesValor"
                          type="text"
                          placeholder="0"
                          value={otrosAjustes.valor}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Permitir vacío, signo menos solo, números y punto decimal
                            if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                              setOtrosAjustes({ ...otrosAjustes, valor: value });
                            }
                          }}
                          className="border-[#00C9CE] focus-visible:ring-[#00C9CE] text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-[#000935] text-white p-4 rounded-lg flex items-center justify-between">
                    <span className="text-lg">Total estimado:</span>
                    <span className="text-[#00C9CE] text-xl">{calcularTotal()} €</span>
                  </div>

                </CardContent>
              </Card>

            </div>
            {/* FIN DEL GRID */}

            {/* FOOTER */}
            <div className="bg-gray-100 p-6 rounded-lg text-center text-sm text-gray-700 space-y-2 mt-8">
              <p>
                <strong>ONUS Express SL</strong> · www.onusexpress.com · Carrer d'Anselm Clavé, s/n, Nave 24 – PI Matacás – 08980 Sant Feliu de Llobregat, Barcelona · NIF: B72735277
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}