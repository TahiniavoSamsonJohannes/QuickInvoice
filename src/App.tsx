import { useState, useMemo, useRef, useEffect } from 'react';
import { Pencil, Trash2, Plus, Download, Printer } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';

type Item = {
  id: string;
  no: number;
  description: string;
  price: number;
  quantity: number;
};

const initialItems: Item[] = [
  { id: '1', no: 1, description: 'Jante', price: 18000, quantity: 2 },
  { id: '2', no: 2, description: 'Moyeu', price: 12000, quantity: 2 },
  { id: '3', no: 3, description: 'Frein', price: 6000, quantity: 2 },
  { id: '4', no: 4, description: 'Rayon', price: 100, quantity: 72 },
  { id: '5', no: 5, description: 'Poignée frein', price: 4000, quantity: 2 },
  { id: '6', no: 6, description: 'Pneu', price: 17000, quantity: 2 },
  { id: '7', no: 7, description: 'Chambre à air', price: 5500, quantity: 2 },
  { id: '8', no: 8, description: 'Guidon', price: 6500, quantity: 1 },
  { id: '9', no: 9, description: 'Pédale', price: 3000, quantity: 2 },
  { id: '10', no: 10, description: 'Développement', price: 18000, quantity: 1 },
  { id: '11', no: 11, description: 'Dérailleur', price: 7000, quantity: 1 },
  { id: '12', no: 12, description: 'Selle', price: 12000, quantity: 1 },
  { id: '13', no: 13, description: 'Chaine', price: 8000, quantity: 1 },
  { id: '14', no: 14, description: 'Garde boue', price: 11000, quantity: 1 },
  { id: '15', no: 15, description: 'Vitesse', price: 6500, quantity: 1 },
  { id: '16', no: 16, description: 'Chaine', price: 8000, quantity: 1 },
  { id: '17', no: 17, description: 'Béquille', price: 6000, quantity: 1 },
  { id: '18', no: 18, description: 'Cable antivol', price: 6000, quantity: 1 },
  { id: '19', no: 19, description: 'Peinture', price: 6000, quantity: 1 },
  { id: '20', no: 20, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '21', no: 21, description: 'Chaine', price: 8000, quantity: 1 },
  { id: '22', no: 22, description: 'Béquille', price: 6000, quantity: 1 },
  { id: '23', no: 23, description: 'Cable antivol', price: 6000, quantity: 1 },
  { id: '24', no: 24, description: 'Peinture', price: 6000, quantity: 1 },
  { id: '25', no: 25, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '26', no: 26, description: 'Garde boue', price: 11000, quantity: 1 },
  { id: '27', no: 27, description: 'Vitesse', price: 6500, quantity: 1 },
  { id: '28', no: 28, description: 'Chaine', price: 8000, quantity: 1 },
  { id: '29', no: 29, description: 'Béquille', price: 6000, quantity: 1 },
  { id: '30', no: 30, description: 'Cable antivol', price: 6000, quantity: 1 },
  { id: '31', no: 31, description: 'Peinture', price: 6000, quantity: 1 },
  { id: '32', no: 32, description: 'Chaine', price: 8000, quantity: 1 },
  { id: '33', no: 33, description: 'Béquille', price: 6000, quantity: 1 },
  { id: '34', no: 34, description: 'Cable antivol', price: 6000, quantity: 1 },
  { id: '35', no: 35, description: 'Peinture', price: 6000, quantity: 1 },
  { id: '36', no: 36, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '37', no: 37, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '38', no: 38, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '39', no: 39, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '40', no: 40, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '41', no: 41, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '42', no: 42, description: 'Jante', price: 18000, quantity: 2 },
  { id: '43', no: 43, description: 'Moyeu', price: 12000, quantity: 2 },
  { id: '44', no: 44, description: 'Frein', price: 6000, quantity: 2 },
  { id: '45', no: 45, description: 'Rayon', price: 100, quantity: 72 },
  { id: '46', no: 46, description: 'Poignée frein', price: 4000, quantity: 2 },
  { id: '47', no: 47, description: 'Pneu', price: 17000, quantity: 2 },
  { id: '48', no: 48, description: 'Chambre à air', price: 5500, quantity: 2 },
  { id: '49', no: 49, description: 'Guidon', price: 6500, quantity: 1 },
  { id: '50', no: 50, description: 'Pédale', price: 3000, quantity: 2 },
  { id: '51', no: 51, description: 'Développement', price: 18000, quantity: 1 },
  { id: '52', no: 52, description: 'Dérailleur', price: 7000, quantity: 1 },
  { id: '53', no: 53, description: 'Selle', price: 12000, quantity: 1 },
  { id: '54', no: 54, description: 'Chaine', price: 8000, quantity: 1 },
  { id: '55', no: 55, description: 'Garde boue', price: 11000, quantity: 1 },
  { id: '56', no: 56, description: 'Vitesse', price: 6500, quantity: 1 },
  { id: '57', no: 57, description: 'Chaine', price: 8000, quantity: 1 },
  { id: '58', no: 58, description: 'Béquille', price: 6000, quantity: 1 },
  { id: '59', no: 59, description: 'Cable antivol', price: 6000, quantity: 1 },
  { id: '60', no: 60, description: 'Peinture', price: 6000, quantity: 1 },
  { id: '61', no: 61, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '62', no: 62, description: 'Chaine', price: 8000, quantity: 1 },
  { id: '63', no: 63, description: 'Béquille', price: 6000, quantity: 1 },
  { id: '64', no: 64, description: 'Cable antivol', price: 6000, quantity: 1 },
  { id: '65', no: 65, description: 'Peinture', price: 6000, quantity: 1 },
  { id: '66', no: 66, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '67', no: 67, description: 'Garde boue', price: 11000, quantity: 1 },
  { id: '68', no: 68, description: 'Vitesse', price: 6500, quantity: 1 },
  { id: '69', no: 69, description: 'Chaine', price: 8000, quantity: 1 },
  { id: '70', no: 70, description: 'Béquille', price: 6000, quantity: 1 },
  { id: '71', no: 71, description: 'Cable antivol', price: 6000, quantity: 1 },
  { id: '72', no: 72, description: 'Peinture', price: 6000, quantity: 1 },
  { id: '73', no: 73, description: 'Chaine', price: 8000, quantity: 1 },
  { id: '74', no: 74, description: 'Béquille', price: 6000, quantity: 1 },
  { id: '75', no: 75, description: 'Cable antivol', price: 6000, quantity: 1 },
  { id: '76', no: 76, description: 'Peinture', price: 6000, quantity: 1 },
  { id: '77', no: 77, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '78', no: 78, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '79', no: 79, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '80', no: 80, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '81', no: 81, description: 'Salaire du peintre', price: 22000, quantity: 1 },
  { id: '82', no: 82, description: 'Salaire du peintre', price: 22000, quantity: 1 },
];

function App() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLSpanElement>(null);
  const [discount, setDiscount] = useState<number>(0);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '+' && !isModalOpen && (e.target === document.body || e.target === document.documentElement)) {
        e.preventDefault();
        handleOpenModal();
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        handleExportPdf();
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        handleExportJpeg();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Form states
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const formatNumber = (num: number) => {
    return num.toLocaleString('de-DE');
  };

  const calculateTotal = (price: number, qty: number) => {
    return price * qty;
  };

  const subTotal = useMemo(() => {
    return items.reduce((acc, item) => acc + calculateTotal(item.price, item.quantity), 0);
  }, [items]);

  const grandTotal = useMemo(() => {
    const calculated = subTotal - (subTotal * discount * 1 / 100);
    return calculated > 0 ? calculated : 0;
  }, [subTotal, discount]);

  const handleOpenModal = (item?: Item) => {
    if (item) {
      setEditingItem(item);
      setDescription(item.description);
      setPrice(item.price.toString());
      setQuantity(item.quantity.toString());
    } else {
      setEditingItem(null);
      setDescription('');
      setPrice('');
      setQuantity('1');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(price) || 0;
    const parsedQty = parseInt(quantity, 10) || 1;

    if (editingItem) {
      setItems(items.map(item =>
        item.id === editingItem.id
          ? { ...item, description, price: parsedPrice, quantity: parsedQty }
          : item
      ));
    } else {
      const newItem: Item = {
        id: Math.random().toString(36).substr(2, 9),
        no: items.length + 1,
        description,
        price: parsedPrice,
        quantity: parsedQty,
      };
      setItems([...items, newItem]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter(item => item.id !== id);
      // Re-index
      return newItems.map((item, index) => ({ ...item, no: index + 1 }));
    });
  };

  const handleExportJpeg = async () => {
    if (invoiceRef.current) {
      try {
        invoiceRef.current.classList.add('is-exporting');
        if (dateRef.current) {
          dateRef.current.innerText = new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' });
        }

        await new Promise(resolve => setTimeout(resolve, 30));
        const captureHeight = invoiceRef.current.scrollHeight;

        const dataUrl = await toJpeg(invoiceRef.current, {
          quality: 1,
          backgroundColor: '#ffffff',
          pixelRatio: 2,
          width: 900,
          height: captureHeight,
          style: {
            width: '900px',
            maxWidth: 'none',
            boxShadow: 'none',
            border: 'none',
            borderRadius: '0',
            margin: '0'
          },
          filter: (node) => {
            if (node instanceof HTMLElement) {
              return !node.classList.contains('hide-on-export');
            }
            return true;
          }
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "quickinvoice-export.jpg";
        link.click();
      } catch (err) {
        console.error('Error exporting image', err);
      } finally {
        invoiceRef.current.classList.remove('is-exporting');
      }
    }
  };

  const handleExportPdf = async () => {
    if (invoiceRef.current) {
      try {
        invoiceRef.current.classList.add('is-exporting');
        if (dateRef.current) {
          dateRef.current.innerText = new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' });
        }

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const margin = 20; // Side margins
        const topBottomMargin = 30; // Better padding between pages

        const printWidth = pdfWidth - (margin * 2);
        const scale = printWidth / 900;

        const pageUsableHeight = pdfHeight - (topBottomMargin * 2);
        const domPageUsableHeight = pageUsableHeight / scale;

        const rows = invoiceRef.current.querySelectorAll('.invoice-table tbody tr');
        const invoiceTop = invoiceRef.current.getBoundingClientRect().top;

        rows.forEach((row) => {
          const htmlRow = row as HTMLElement;
          const rowTop = htmlRow.getBoundingClientRect().top - invoiceTop;
          const rowBottom = rowTop + htmlRow.getBoundingClientRect().height;

          const pageIndexTop = Math.floor(rowTop / domPageUsableHeight);
          const pageIndexBottom = Math.floor((rowBottom - 0.5) / domPageUsableHeight);

          if (pageIndexBottom > pageIndexTop) {
            const shiftAmt = (pageIndexBottom * domPageUsableHeight) - rowTop;
            const spacer = document.createElement('tr');
            spacer.className = 'pdf-spacer-row border-none';

            const td = document.createElement('td');
            td.colSpan = 6;
            td.style.height = `${shiftAmt}px`;
            td.style.padding = '0';
            td.style.border = 'none';

            spacer.appendChild(td);
            htmlRow.parentNode?.insertBefore(spacer, htmlRow);
          }
        });

        const totalsBlock = invoiceRef.current.querySelector('.totals-block') as HTMLElement;
        if (totalsBlock) {
          const tbTop = totalsBlock.getBoundingClientRect().top - invoiceTop;
          const tbBottom = tbTop + totalsBlock.getBoundingClientRect().height;
          const pageIndexTop = Math.floor(tbTop / domPageUsableHeight);
          const pageIndexBottom = Math.floor((tbBottom - 0.5) / domPageUsableHeight);

          if (pageIndexBottom > pageIndexTop) {
            const shiftAmt = (pageIndexBottom * domPageUsableHeight) - tbTop;
            totalsBlock.style.marginTop = `${shiftAmt + 24}px`;
          }
        }

        await new Promise(resolve => setTimeout(resolve, 50));
        const captureHeight = invoiceRef.current.scrollHeight;

        const dataUrl = await toJpeg(invoiceRef.current, {
          quality: 1,
          backgroundColor: '#ffffff',
          pixelRatio: 2, // Higher resolution for better PDF quality
          width: 900,
          height: captureHeight,
          style: {
            width: '900px',
            maxWidth: 'none',
            boxShadow: 'none',
            border: 'none',
            borderRadius: '0',
            margin: '0'
          },
          filter: (node) => {
            if (node instanceof HTMLElement) {
              return !node.classList.contains('hide-on-export');
            }
            return true;
          }
        });

        const imgProps = pdf.getImageProperties(dataUrl);
        const printHeight = (imgProps.height * printWidth) / imgProps.width;

        let heightLeft = printHeight;
        let position = topBottomMargin;

        // First Page
        pdf.addImage(dataUrl, 'JPEG', margin, position, printWidth, printHeight);

        // Mask top and bottom on first page
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pdfWidth, topBottomMargin, 'F'); // Top mask
        pdf.rect(0, pdfHeight - topBottomMargin, pdfWidth, topBottomMargin, 'F'); // Bottom mask

        heightLeft -= pageUsableHeight;

        // Subsequent Pages
        while (heightLeft > 0) {
          position -= pageUsableHeight;
          pdf.addPage();
          pdf.addImage(dataUrl, 'JPEG', margin, position, printWidth, printHeight);

          // Mask top and bottom on each following page
          pdf.setFillColor(255, 255, 255);
          pdf.rect(0, 0, pdfWidth, topBottomMargin, 'F'); // Top mask
          pdf.rect(0, pdfHeight - topBottomMargin, pdfWidth, topBottomMargin, 'F'); // Bottom mask

          heightLeft -= pageUsableHeight;
        }

        pdf.save("quickinvoice-export.pdf");
      } catch (err) {
        console.error('Error exporting PDF', err);
      } finally {
        invoiceRef.current.classList.remove('is-exporting');
        // Clean up DOM structural tweaks
        const spacers = invoiceRef.current.querySelectorAll('.pdf-spacer-row');
        spacers.forEach(spacer => spacer.remove());
        const totalsBlock = invoiceRef.current.querySelector('.totals-block') as HTMLElement;
        if (totalsBlock) totalsBlock.style.marginTop = '';
      }
    }
  };

  return (
    <div className="min-h-screen p-2 sm:p-6 md:p-8 bg-gray-50 flex flex-col items-center font-sans transition-all">

      {/* Controls */}
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center print:hidden hide-on-export gap-2 flex-wrap">
        <div className="flex items-center gap-2 mr-auto sm:mr-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">QuickInvoice</h1>
        </div>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap justify-end">
          <button
            onClick={() => {
              if (window.confirm("Êtes-vous sûr de vouloir tout effacer ?")) {
                setItems([]);
                setDiscount(0);
              }
            }}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-md font-medium transition-colors shadow-sm"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Tout effacer</span>
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-md font-medium transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Ajouter un article</span>
          </button>
          <button
            onClick={handleExportPdf}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-md font-medium transition-colors shadow-sm"
          >
            <Printer size={18} />
            <span className="hidden sm:inline">Imprimer / PDF</span>
          </button>
          <button
            onClick={handleExportJpeg}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-md font-medium transition-colors shadow-sm"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Exporter JPG</span>
          </button>
        </div>
      </div>

      {/* Invoice Area */}
      <div className="w-full">
        <div
          ref={invoiceRef}
          className="invoice-box min-w-fit w-full max-w-4xl mx-auto bg-white flex flex-col items-stretch shadow-xl rounded-sm print:shadow-none print:border-none print:p-0"
        >
          {/* Export Header */}
          <div className="hide-on-screen mb-6 justify-between items-end border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <h1 className="invoice-header-title font-bold text-[#0b65ff]">QuickInvoice</h1>
            </div>
            <div className="text-right text-gray-500 font-medium invoice-header-date">
              <p>Édité le <span ref={dateRef}></span></p>
            </div>
          </div>

          <table className="w-full border-collapse invoice-table">
            <thead>
              <tr className="bg-[#0b65ff] text-white">
                <th className="font-bold w-7 sm:w-16 text-center align-middle">NO</th>
                <th className="font-bold text-left w-25 sm:w-auto align-middle">DESCRIPTION</th>
                <th className="font-bold text-center w-20 sm:w-auto align-middle">PRIX UNITAIRE</th>
                <th className="font-bold text-center w-20 sm:w-24 align-middle">QUANTITÉ</th>
                <th className="font-bold text-right w-15 sm:w-32 align-middle">TOTAL</th>
                <th className="font-bold text-center w-12 sm:w-24 print:hidden hide-on-export align-middle">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const rowTotal = calculateTotal(item.price, item.quantity);
                return (
                  <tr
                    key={item.id}
                    className={`
                    ${index % 2 === 0 ? 'bg-gray-100/60' : 'bg-white'} 
                    border-b border-gray-50 hover:bg-blue-50/50 transition-colors
                  `}
                  >
                    <td className="py-2 px-3 font-bold text-center text-gray-900 align-middle">{item.no}</td>
                    <td className="py-2 px-3 text-left text-gray-800 align-middle">{item.description}</td>
                    <td className="py-2 px-3 text-center font-medium text-gray-700 align-middle">
                      {formatNumber(item.price)}
                    </td>
                    <td className="py-2 px-3 text-center text-gray-700 align-middle">{item.quantity}</td>
                    <td className="py-2 px-3 text-right font-semibold text-gray-900 align-middle">
                      {formatNumber(rowTotal)}
                    </td>
                    <td className="py-2 px-3 text-center print:hidden hide-on-export align-middle">
                      <div className="flex justify-center gap-3 text-gray-400">
                        <button onClick={() => handleOpenModal(item)} className="hover:text-blue-600 transition-colors" title="Modifier">
                          <Pencil className='w-3 h-3 sm:w-4.5 sm:h-4.5' />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="hover:text-red-500 transition-colors" title="Supprimer">
                          <Trash2 className='w-3 h-3 sm:w-4.5 sm:h-4.5' />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 font-medium">
                    Aucun article.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex flex-col items-end mt-6 space-y-2 totals-block totals-text">
            <div className="flex w-full sm:w-75 justify-between px-4 py-2 text-gray-700">
              <span className="font-bold">SOUS-TOTAL</span>
              <span className="font-semibold">{formatNumber(subTotal)}</span>
            </div>
            <div className="flex w-full sm:w-75 justify-between px-4 py-2 text-gray-700 items-center">
              <span className="font-bold">REMISE %</span>
              <div className="flex justify-end items-center">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={discount === 0 ? '' : discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-20 sm:w-24 border border-gray-300 rounded px-2 py-1 text-right outline-none focus:border-blue-500 hide-on-export print:hidden font-semibold"
                  placeholder="0"
                />
                <span className="show-on-export-inline font-semibold">{formatNumber(discount)}</span>
              </div>
            </div>
            <div className="flex bg-[#0b65ff] text-white overflow-hidden w-full sm:w-75 mt-2 rounded-none">
              <div className="py-2 px-4 sm:py-3 sm:px-6 font-bold flex-1 flex items-center">TOTAL</div>
              <div className="py-2 px-4 sm:py-3 sm:px-6 font-bold text-center text-base sm:text-lg align-middle">
                {formatNumber(grandTotal)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 print:hidden hide-on-export">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-popup">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingItem ? 'Modifier l\'article' : 'Ajouter un article'}
            </h2>
            <form onSubmit={handleSave}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Jante"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix Unitaire</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="any"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: 18000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: 2"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
                >
                  {editingItem ? 'Enregistrer' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
