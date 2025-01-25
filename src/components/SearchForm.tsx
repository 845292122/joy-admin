import { Box, Button, ButtonGroup, FormControl, FormLabel, Input, Option, Select } from '@mui/joy'
import React from 'react'
import { BsFillMortarboardFill } from 'react-icons/bs'
import { IoSearchCircleOutline } from 'react-icons/io5'

export type OptionProps = {
  label: string
  value: string
}

export type SearchFormItem = {
  label: string
  name: string
  type: 'text' | 'select'
  placeholder?: string
  options?: OptionProps[]
}

export type SearchFormProps = {
  items: SearchFormItem[]
  onSearch: (param: any) => void
}

export default function SearchForm({ items, onSearch }: SearchFormProps) {
  const [formState, setFormState] = React.useState<Record<string, any>>({})

  // 更改表单状态
  const handleChange = (name: string, value: any) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 重置事件
  const handleReset = () => {
    setFormState({})
  }

  // 搜索事件
  const handleSearch = () => {
    if (onSearch) {
      onSearch(formState)
    }
  }

  return (
    <Box
      className="SearchAndFilters-tabletUp"
      sx={{
        borderRadius: 'sm',
        py: 2,
        display: { xs: 'none', sm: 'flex' },
        flexWrap: 'wrap',
        gap: 1.5,
        '& > *': {
          minWidth: { xs: '120px', md: '160px' }
        }
      }}
    >
      {items.map((item: SearchFormItem) => (
        <FormControl size="sm">
          <FormLabel>{item.label}</FormLabel>
          {item.type === 'text' && (
            <Input
              size="sm"
              placeholder={item.placeholder ?? `输入${item.label}以查询`}
              startDecorator={<IoSearchCircleOutline />}
              value={formState[item.name]}
              onChange={e => handleChange(item.name, e.target.value)}
            />
          )}
          {item.type === 'select' && (
            <Select size="sm" placeholder={item.label}>
              {item.options?.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )}
        </FormControl>
      ))}

      <ButtonGroup sx={{ alignSelf: 'center', mt: 'auto' }} variant="soft">
        <Button color="primary" size="sm" startDecorator={<BsFillMortarboardFill />} onClick={handleSearch}>
          查询
        </Button>
        <Button color="primary" size="sm" startDecorator={<BsFillMortarboardFill />} onClick={handleReset}>
          重置
        </Button>
      </ButtonGroup>
    </Box>
  )
}
