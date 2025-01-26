import { Checkbox, Table } from '@mui/joy'
import React from 'react'

export type ColumnConfig<T> = {
  title: string
  dataIndex: keyof T
  width?: number
  render?: (value: any, record: T) => React.ReactNode
}

export type DataTableProps<T> = {
  columns: ColumnConfig<T>[]
  dataSource: T[]
  rowKey: keyof T
  showCheckbox?: boolean
  selectedRows?: T[]
  onSelectChange?: (selectedRows: T[]) => void
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  dataSource,
  rowKey,
  showCheckbox = false,
  selectedRows = [],
  onSelectChange
}: DataTableProps<T>) {
  // 处理选择事件
  const handleSelectAll = (checked: boolean) => {
    onSelectChange?.(checked ? dataSource : [])
  }

  const handleSelectRow = (checked: boolean, record: T) => {
    if (checked) {
      onSelectChange?.([...selectedRows, record])
    } else {
      onSelectChange?.(selectedRows.filter(item => item[rowKey] !== record[rowKey]))
    }
  }

  return (
    <Table
      aria-labelledby="tableTitle"
      stickyHeader
      hoverRow
      sx={{
        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
        '--Table-headerUnderlineThickness': '1px',
        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
        '--TableCell-paddingY': '4px',
        '--TableCell-paddingX': '8px'
      }}
    >
      <thead>
        <tr>
          {showCheckbox && (
            <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
              <Checkbox
                size="sm"
                indeterminate={selectedRows.length > 0 && selectedRows.length !== dataSource.length}
                checked={selectedRows.length === dataSource.length}
                onChange={event => handleSelectAll(event.target.checked)}
                sx={{ verticalAlign: 'text-bottom' }}
              />
            </th>
          )}
          {columns.map(column => (
            <th key={String(column.dataIndex)} style={{ width: column.width, padding: '12px 6px' }}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map(record => (
          <tr key={String(record[rowKey])}>
            {showCheckbox && (
              <td style={{ textAlign: 'center', width: 48 }}>
                <Checkbox
                  size="sm"
                  checked={selectedRows.some(item => item[rowKey] === record[rowKey])}
                  onChange={event => handleSelectRow(event.target.checked, record)}
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </td>
            )}
            {columns.map(column => (
              <td key={String(column.dataIndex)}>
                {column.render ? column.render(record[column.dataIndex], record) : (record[column.dataIndex] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
