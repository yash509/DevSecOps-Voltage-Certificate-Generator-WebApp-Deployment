import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Container,
  Paper,
} from '@mui/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CertificateGenerator = () => {
  const [formData, setFormData] = useState({
    equipmentTested: '',
    customerName: '',
    transformerRatio: '',
    burden: '',
    accuracyClass: '',
  });

  const equipmentOptions = [
    { value: '1', label: '11 KV INDOOR VOLTAGE TRANSFORMER-P.T. (Epoxy Resin Type)' },
    { value: '2', label: '11 KV CURRENT TRANSFORMER-C.T (Epoxy Resin Type)' },
    { value: '3', label: 'LOW TENSION- L.T. C.T (Epoxy Resin Type)' },
    { value: '4', label: '11 kV CT PT Combined Metering Unit' },
  ];

  const burdenOptions = ["2.5VA", "5VA", "10VA", "15VA"];
  const accuracyClassOptions = ["0.2s", "0.2", "0.5", "0.5s", "1"];
  const ltctTableData = [
    ['SR NO.', 'CURRENT RATIO', 'BURDEN', 'TYPE OF ERROR', 'PERCENTAGE OF RATED PRIMARY CURRENT'],
    [formData.serialNumber+'-A', formData.currentRatio, formData.burden, 'CURRENT ERROR IN %', '120%: -0.121, 100%: -0.139, 20%: -0.396, 5%: -0.896'],
    [formData.serialNumber+'-B', formData.currentRatio, formData.burden, 'PHASE ERROR IN MIN.', '120%: -2.98, 100%: -1.08, 20%: 9.56, 5%: 19.1'],
    [formData.serialNumber+'-C', formData.currentRatio, formData.burden, 'CURRENT ERROR IN %', '120%: -0.174, 100%: -0.222, 20%: -0.541, 5%: -0.996'],
    [formData.serialNumber+'-D', formData.currentRatio, formData.burden, 'PHASE ERROR IN MIN.', '120%: -2.29, 100%: -1.44, 20%: 11.9, 5%: 25.1'],
    // Add other rows similarly...
  ];

  const ctTableData = [
    ['SR NO.', 'CURRENT RATIO', 'BURDEN', 'TYPE OF ERROR', 'PERCENTAGE OF RATED PRIMARY CURRENT'],
    [formData.serialNumber+'-A', formData.currentRatio, formData.burden, 'CURRENT ERROR IN %', '120%: -0.070, 100%: -0.072, 20%: -0.131, 5%: -0.228, 1%: -0.264'],
    [formData.serialNumber+'-B', formData.currentRatio, formData.burden, 'PHASE ERROR IN MIN.', '120%: 0.26, 100%: 0.10, 20%: 0.50, 5%: 3.84, 1%: 3.84'],
    [formData.serialNumber+'-C', formData.currentRatio, formData.burden, 'CURRENT ERROR IN %', '120%: -0.044, 100%: -0.074, 20%: -0.101, 5%: -0.101, 1%: -0.114'],
    // Add other rows similarly...
  ];

  const ctptTableData = [
    ['SR NO.', 'CURRENT RATIO', 'BURDEN', 'TYPE OF ERROR', 'PERCENTAGE OF RATED PRIMARY CURRENT'],
    [formData.serialNumber+'-A', formData.currentRatio, formData.burden, 'CURRENT ERROR IN %', '120%: -0.036, 100%: -0.039, 20%: -0.091, 5%: -0.114, 1%: -0.096'],
    [formData.serialNumber+'-A', formData.currentRatio, formData.burden, 'PHASE ERROR IN MIN.', '120%: 0.44, 100%: 1.44, 20%: 2.08, 5%: 6.11, 1%: 9.31'],
    [formData.serialNumber+'-B', formData.currentRatio, formData.burden, 'CURRENT ERROR IN %', '120%: -0.063, 100%: -0.061, 20%: -0.116, 5%: -0.148, 1%: -0.142'],
    [formData.serialNumber+'-B', formData.currentRatio, formData.burden, 'PHASE ERROR IN MIN.', '120%: 0.21, 100%: 0.99, 20%: 2.58, 5%: 7.16, 1%: 12.8'],
    [formData.serialNumber+'-C', formData.currentRatio, formData.burden, 'CURRENT ERROR IN %', '120%: -0.055, 100%: -0.061, 20%: -0.130, 5%: -0.221, 1%: -0.254'],
    [formData.serialNumber+'-C', formData.currentRatio, formData.burden, 'PHASE ERROR IN MIN.', '120%: 0.24, 100%: 0.06, 20%: 1.32, 5%: 5.64, 1%: 16.4']
  ];
  
  const vtTableData = [
    ['PHASES', 'VA @0.8PF (lag)', 'PRIMARY CURRENT %', 'RATIO ERROR IN %', 'PHASE ERROR IN MIN.'],
    ['A-B', formData.burden, '80%', '0.222', '1.44'],
    ['A-B', formData.burden, '100%', '0.225', '2.21'],
    ['A-B', formData.burden, '120%', '0.249', '4.01'],
    ['B-C', formData.burden, '80%', '0.214', '1.45'],
    ['B-C', formData.burden, '100%', '0.216', '1.91'],
    ['B-C', formData.burden, '120%', '0.241', '3.81'],
    ['A-C', formData.burden, '80%', '0.211', '2.09'],
    ['A-C', formData.burden, '100%', '0.216', '2.91'],
    ['A-C', formData.burden, '120%', '0.243', '5.46']
  ];
  

  const ptTableData = [
    ['SR NO.', 'BETWEEN PHASES', 'VA @0.8PF (lag)', '% OF RATED PRIMARY VOLTAGE'],
    [formData.serialNumber+'', 'A-B', formData.burden, '80%: -0.018, 100%: -0.176, 120%: -0.266'],
    [formData.serialNumber+'', 'A-B', formData.burden, 'PHASE ANGLE ERROR-MINIMUM: 80%: 3.68, 100%: 5.53, 120%: 10.2'],
    [formData.serialNumber+'', 'B-C', formData.burden, '80%: -0.018, 100%: -0.176, 120%: -0.266'],
    [formData.serialNumber+'', 'B-C', formData.burden, 'PHASE ANGLE ERROR-MINIMUM: 80%: 3.68, 100%: 5.53, 120%: 10.2'],
    [formData.serialNumber+'', 'A-C', formData.burden, '80%: -0.064, 100%: -0.118, 120%: -0.153'],
    [formData.serialNumber+'', 'A-C', formData.burden, 'PHASE ANGLE ERROR-MINIMUM: 80%: 4.65, 100%: 7.94, 120%: 12.1'],
    // Add other rows similarly...
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getSpecificationText = (equipmentTested) => {
    switch (equipmentTested) {
      case '1':
      case '3':
        return 'The Following Routine Test conforming to IS:16227 (1 & 3)';
      case '2':
        return 'The Following Routine Test conforming to IS:16227 (1 & 2)';
      case '4':
        return 'The Following Routine Test conforming to IS:2705/1992 & 3156/1992';
      default:
        return 'The Following Routine Test conforming to IS:2705/1992';
    }
  };

  const getTableForEquipment = (equipmentTested) => {
    switch (equipmentTested) {
      case '1':
        return [
          ['TEST CONDUCTED', 'SPECIFIED VALUE', 'OBSERVED VALUE', 'REMARKS'],
          ['Verification of Terminal Markings and Polarity', 'Conforming to IS 3156 (Part 1 and 3)', 'Conforming', 'OK'],
          ['Power Frequency Dry One Minute Withstand Test', '28 kV', 'Withstood', 'OK'],
          ['Power Frequency Wet One Minute Withstand Test', '23 kV', 'Withstood', 'OK'],
          ['Induced Overvoltage Withstand Test', '24 kV', 'Withstood', 'OK'],
          ['Partial Discharge Test', '≤ 10 pC at 1.9 U0', '≤ 10 pC', 'OK'],
          ['Accuracy Test', 'Specified', 'As per IS 3156', 'OK'],
        ];
      case '2':
        return [
          ['TEST CONDUCTED', 'SPECIFIED VALUE', 'OBSERVED VALUE', 'REMARKS'],
          ['Verification of Terminal Markings and Polarity', 'Conforming to IS 16227 (Part 1)', 'Conforming', 'OK'],
          ['Power Frequency Dry One Minute Withstand Test', '28 kV', 'Withstood', 'OK'],
          ['Power Frequency Wet One Minute Withstand Test', '23 kV', 'Withstood', 'OK'],
          ['Induced Overvoltage Withstand Test', '24 kV', 'Withstood', 'OK'],
          ['Partial Discharge Test', '≤ 10 pC at 1.9 U0', '≤ 10 pC', 'OK'],
          ['Accuracy Test', 'Specified', 'As per IS 2705', 'OK'],
        ];
        case '3':
          return [
            ['TEST CONDUCTED', 'SPECIFIED VALUE', 'OBSERVED VALUE', 'REMARKS'],
            ['Verification of Terminal Markings and Polarity', 'Conforming to IS 2705 (Part 1 and 3)', 'Conforming', 'OK'],
          ['Power Frequency Dry One Minute Withstand Test', '3 kV', 'Withstood', 'OK'],
          ['Power Frequency Wet One Minute Withstand Test', '2.5 kV', 'Withstood', 'OK'],
          ['Induced Overvoltage Withstand Test', '2.4 kV', 'Withstood', 'OK'],
          ['Partial Discharge Test', '≤ 10 pC at 1.9 U0', '≤ 10 pC', 'OK'],
          ['Accuracy Test', 'Specified', 'As per IS 16227', 'OK'],
        ];
      case '4':
        return [
          ['TEST CONDUCTED', 'SPECIFIED VALUE', 'OBSERVED VALUE', 'REMARKS'],
          ['Verification of Terminal Markings and Polarity', 'Conforming to IS 2705/IS 3156', 'Conforming', 'OK'],
          ['Power Frequency Dry One Minute Withstand Test', '28 kV', 'Withstood', 'OK'],
          ['Power Frequency Wet One Minute Withstand Test', '23 kV', 'Withstood', 'OK'],
          ['Induced Overvoltage Withstand Test', '24 kV', 'Withstood', 'OK'],
          ['Partial Discharge Test', '≤ 10 pC at 1.9 U0', '≤ 10 pC', 'OK'],
          ['Accuracy Test', 'Specified', 'As per IS 2705/IS 3156', 'OK'],
        ];
      default:
        return [];
    }
  };

  const generatePDF = () => {
    const { equipmentTested, customerName, transformerRatio, burden, accuracyClass } = formData;
    const equipmentName = equipmentOptions.find((option) => option.value === equipmentTested)?.label;
    const specificationText = getSpecificationText(equipmentTested);
    const tableContent = getTableForEquipment(equipmentTested);
  
    const documentDefinition = {
      content: [
        { text: 'SHIV ELECTRICAL & ENGINEERING WORKS', style: 'header' },
        { text: 'Works (Routine) Test Certificate', style: 'subheader' },
        {
          table: {
            body: [
              [{ text: '1. EQUIPMENT TESTED', style: 'tableHeader' }, { text: equipmentName, style: 'tableCell' }],
              [{ text: '2. CUSTOMER NAME', style: 'tableHeader' }, { text: customerName, style: 'tableCell' }],
              [{ text: '3. SPECIFICATIONS', style: 'tableHeader' }, { text: specificationText, style: 'tableCell' }],
              ...(equipmentTested !== '4' ? [
                [{ text: '4. RATIO', style: 'tableHeader' }, { text: (equipmentTested === '1') ? '11000/110V' : transformerRatio, style: 'tableCell' }],
                [{ text: '5. RATED VOLTAGE', style: 'tableHeader' }, { text: equipmentTested === '3' ? '415V' : '11 KV', style: 'tableCell' }],
                ...(equipmentTested !== '3' ? [[{ text: '6. H S V', style: 'tableHeader' }, { text: '12 KV', style: 'tableCell' }]] : []),
                [{ text: '7. BURDEN', style: 'tableHeader' }, { text: burden, style: 'tableCell' }],
                [{ text: '8. ACCURACY CLASS', style: 'tableHeader' }, { text: accuracyClass, style: 'tableCell' }],
                [{ text: '9. I L', style: 'tableHeader' }, { text: equipmentTested === '3' ? '.66kV' : '28 KV / 75 KVp', style: 'tableCell' }],
                [{ text: '10. FREQUENCY', style: 'tableHeader' }, { text: '50 HZ', style: 'tableCell' }],
                [{ text: '11. S. T. C', style: 'tableHeader' }, { text: equipmentTested === '1' ? '': '13.1 KV for 1 Sec.' , style: 'tableCell' }],
                [{ text: '12. VOLTAGE FACTOR', style: 'tableHeader' }, { text: equipmentTested === '1' ? '1.2 TIMES CONT. & 1.5 FOR 30 SEC.' : '', style: 'tableCell' }],

              ] : [
                [{ text: '4. RATIO', style: 'tableHeader' }, { text: transformerRatio, style: 'tableCell' }],
                [{ text: '5. RATED VOLTAGE', style: 'tableHeader' }, { text: '11 KV', style: 'tableCell' }],
                [{ text: '6. H S V', style: 'tableHeader' }, { text: '12 KV', style: 'tableCell' }],
                [{ text: '7. BURDEN', style: 'tableHeader' }, { text: burden, style: 'tableCell' }],
                [{ text: '8. ACCURACY CLASS', style: 'tableHeader' }, { text: accuracyClass, style: 'tableCell' }],
                [{ text: '9. I L', style: 'tableHeader' }, { text: '28 KV / 75 KVp', style: 'tableCell' }],
                [{ text: '10. FREQUENCY', style: 'tableHeader' }, { text: '50 HZ', style: 'tableCell' }],
                [{ text: '11. S. T. C', style: 'tableHeader' }, { text: equipmentTested === '1' ? '': '13.1 KV for 1 Sec.' , style: 'tableCell' }],

                [{ text: '12. VOLTAGE FACTOR', style: 'tableHeader' }, { text: equipmentTested === '1' ? '1.2 TIMES CONT. & 1.5 FOR 30 SEC.' : '', style: 'tableCell' }]

              ]),
              ...tableContent.map(([header, value]) => [
                { text: header, style: 'tableHeader' },
                { text: value, style: 'tableCell' },
              ]),
            ],
          },
          layout: 'lightHorizontalLines',
          style: 'table',
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10], color: 'navy' },
        subheader: { fontSize: 14, bold: true, alignment: 'center', margin: [0, 10, 0, 5], color: 'blue' },
        table: { margin: [0, 5, 0, 15] },
        tableHeader: { bold: true, fontSize: 12, color: 'black', fillColor: '#eeeeee', alignment: 'left' },
        tableCell: { margin: [5, 5, 5, 5] },
      },
    };
  
    if (formData.equipmentTested === '3') {
      documentDefinition.content.push({
        text: 'LTCT Table',
        style: 'subheader',
      });
      documentDefinition.content.push({
        table: {
          body: vtTableData,
        },
        layout: 'lightHorizontalLines',
        style: 'table',
      });
    }
  
    if (formData.equipmentTested === '2') {
      documentDefinition.content.push({
        text: 'CT Table',
        style: 'subheader',
      });
      documentDefinition.content.push({
        table: {
          body: ctTableData,
        },
        layout: 'lightHorizontalLines',
        style: 'table',
      });
    }
  
    if (formData.equipmentTested === '4') {
      documentDefinition.content.push({
        text: 'PT Table',
        style: 'subheader',
      });
      documentDefinition.content.push({
        table: {
          body: ptTableData,
        },
        layout: 'lightHorizontalLines',
        style: 'table',
      });
    }
  
    if (formData.equipmentTested === '1' || formData.equipmentTested === '3' || formData.equipmentTested === '4') {
      documentDefinition.content.push({
        text: 'CTPT Table',
        style: 'subheader',
      });
      documentDefinition.content.push({
        table: {
          body: ctptTableData,
        },
        layout: 'lightHorizontalLines',
        style: 'table',
      });
    }
  
    pdfMake.createPdf(documentDefinition).download('certificate.pdf');
  };
  
  return (
    <Container component={Paper} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Works (Routine) Test Certificate Generator
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
  <FormControl fullWidth>
    <InputLabel>Equipment Tested</InputLabel>
    <Select name="equipmentTested" value={formData.equipmentTested} onChange={handleChange}>
      {equipmentOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <TextField name="customerName" label="Customer Name" fullWidth value={formData.customerName} onChange={handleChange} />
  <TextField name="transformerRatio" label="Transformer Ratio" fullWidth value={formData.transformerRatio} onChange={handleChange} />
  <FormControl fullWidth>
    <InputLabel>Burden</InputLabel>
    <Select name="burden" value={formData.burden} onChange={handleChange}>
      {burdenOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <TextField name="serialNumber" label="Serial Number" fullWidth value={formData.serialNumber} onChange={handleChange} />
  <TextField name="currentRatio" label="Current Ratio" fullWidth value={formData.currentRatio} onChange={handleChange} />
  <FormControl fullWidth>
    <InputLabel>Accuracy Class</InputLabel>
    <Select name="accuracyClass" value={formData.accuracyClass} onChange={handleChange}>
      {accuracyClassOptions.map((option) => (
        <MenuItem key={option} value={option}>
           {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <Button variant="contained" color="primary" onClick={generatePDF}>
    Generate PDF
  </Button>
</Box>


      {/* LTCT Table */}
      {formData.equipmentTested === '3' && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            LTCT Table
          </Typography>
          <table>
            <tbody>
              {ltctTableData.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, idx) => (
                    <td key={idx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
      {/* CT Table */}
      {formData.equipmentTested === '2' && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            CT Table
          </Typography>
          <table>
            <tbody>
              {ctTableData.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, idx) => (
                    <td key={idx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
      {/* PT Table */}
      {formData.equipmentTested === '4' && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            PT Table
          </Typography>
          <table>
            <tbody>
              {ptTableData.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, idx) => (
                    <td key={idx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </Container>
  );
};

export default CertificateGenerator;

