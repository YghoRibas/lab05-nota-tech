import { Box, TextField, Typography } from "@mui/material";
import RRadioGroup, { RadioOption } from "src/modules/@shared/components/form/r-radio-group";
import RTextField from "src/modules/@shared/components/form/r-text-field";

export interface NfseDetailsProps {
  id: number;
}

export default function NfseDetails({ id }: NfseDetailsProps) {
  const options: RadioOption[] = [
    {
      id: 'origin_plant',
      label: 'Planta Origem'
    },
    {
      id: 'cluster',
      label: 'Cluster'
    },
    {
      id: 'transport_type',
      label: 'Tp Transporte'
    }
  ]
  
  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" sx={{ flexFlow: 'row wrap', rowGap: '20px' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontFamily: 'system-ui',
            color: 'text.disabled',
            mb: 1,
            width: '100%'
          }}>
          Palavra Chave:
        </Typography>

        <Box
          display="flex"
          sx={{
            gap: '20px 25px',
            flexWrap: {
              xs: 'wrap',
              md: 'wrap'
            },
            width: '100%'
          }}>
          {id > 0 &&
            <TextField
              value={id}
              disabled
              label="NUMERO:"
              sx={{ minWidth: '96px' }}
            />}
          
          <RTextField
            name="value"
            label="Palavra Chave"
            sx={{ maxWidth: 400 }}
          />
          
          <Box sx={{ width: '100%' }} />

          <RRadioGroup 
            name="type"
            variant="bordered"
            options={options}
            label="Tipo"
          />
        </Box>
      </Box>
    </Box>
  )
}