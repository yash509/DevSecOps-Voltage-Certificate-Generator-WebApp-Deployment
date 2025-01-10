import React, { useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Certificate = () => {
  const [formData, setFormData] = useState({
    equipmentTested: '',
    customerName: '',
    transformerRatio: '',
    ratedVoltage: '',
    hsv: '',
    burden: '',
    accuracyClass: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = () => {
    const { equipmentTested, customerName, transformerRatio, ratedVoltage, hsv, burden, accuracyClass } = formData;

    const documentDefinition = {
      content: [
        { text: 'SHIV ELECTRICAL & ENGINEERING WORKS', style: 'header' },
        { text: 'Works (Routine) Test Certificate', style: 'subheader' },
        {
          table: {
            body: [
              ['1. EQUIPMENT TESTED', equipmentTested],
              ['2. CUSTOMER NAME', customerName],
              ['3. SPECIFICATIONS', 'The Following Routine Test conforming to IS:16227 (1 & 3)'],
              ['4. RATIO', transformerRatio],
              ['5. RATED VOLTAGE', ratedVoltage],
              ['6. H S V', hsv],
              ['7. BURDEN', burden],
              ['8. ACCURACY CLASS', accuracyClass],
              ['9. I L', ratedVoltage === '11 KV' ? '28 KV / 75 KVp' : '.66kV'],
              ['10. FREQUENCY', '50 HZ'],
              ['11. S.T.C', '13.1 KA for 1 Sec'],
            ],
          },
          style: 'table',
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, alignment: 'center', margin: [0, 10, 0, 5] },
        table: { margin: [0, 5, 0, 15] },
      },
    };

    pdfMake.createPdf(documentDefinition).download('certificate.pdf');
  };

  return (
    <div>
      <h1>Generate Certificate</h1>
      <form>
        <div>
          <label>Equipment Tested:</label>
          <input type="text" name="equipmentTested" onChange={handleChange} />
        </div>
        <div>
          <label>Customer Name:</label>
          <input type="text" name="customerName" onChange={handleChange} />
        </div>
        <div>
          <label>Transformer Ratio:</label>
          <input type="text" name="transformerRatio" onChange={handleChange} />
        </div>
        <div>
          <label>Rated Voltage:</label>
          <input type="text" name="ratedVoltage" onChange={handleChange} />
        </div>
        <div>
          <label>HSV:</label>
          <input type="text" name="hsv" onChange={handleChange} />
        </div>
        <div>
          <label>Burden:</label>
          <input type="text" name="burden" onChange={handleChange} />
        </div>
        <div>
          <label>Accuracy Class:</label>
          <input type="text" name="accuracyClass" onChange={handleChange} />
        </div>
        <button type="button" onClick={generatePDF}>Generate PDF</button>
      </form>
    </div>
  );
};

export default Certificate;
