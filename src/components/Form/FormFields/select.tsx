import {
    IndexPath,
    Select,
    SelectItem,
    SelectGroup,
    SelectProps,
    Text,
  } from '@ui-kitten/components';
  import React, { useCallback, useState } from 'react';
  import { Control, useController } from 'react-hook-form';
  
  import FieldWrapper from './FieldWrapper';
  
  type SelectOption = {
    label: string;
    value: any;
  };
  
  type SelectOptionGroup = {
    label: string;
    options: SelectOption[];
  };
  
  type SelectOptionOrGroup = SelectOption | SelectOptionGroup;
  
  interface Props extends SelectProps {
    name: string;
    control: Control<any>;
    label?: string;
    caption?: string;
    options: SelectOptionOrGroup[];
    renderItem?: (item: SelectOption) => React.ReactElement;
    renderGroup?: (item: SelectOptionGroup) => React.ReactElement;
  }
  
  const findOption = ({ row, section }: IndexPath, options) => {
    if (section !== undefined) {
      return options[section].options[row];
    } else {
      return options[row];
    }
  };
  
  const renderValue = (indexPaths: IndexPath | IndexPath[], options: SelectOptionOrGroup[]) => {
    const indexes = Array.isArray(indexPaths) ? indexPaths : [indexPaths];
    const labels = indexes.map((idx) => findOption(idx, options).label);
    return <Text>{labels.join(', ')}</Text>;
  };
  
  const defaultRenderItem: Props['renderItem'] = (item) => {
    return <SelectItem key={item.value} title={() => <Text category='s2'>{item.label}</Text>} />;
  };
  
  const defaultRenderGroup: Props['renderGroup'] = (item) => {
    return (
      <SelectGroup key={item.label} title={item.label}>
        {item.options.map((option) => defaultRenderItem(option))}
      </SelectGroup>
    );
  };
  
  export default function SelectField({
    name,
    control,
    label,
    caption,
    placeholder = 'Selecione uma opção',
    options,
    renderItem = defaultRenderItem,
    renderGroup = defaultRenderGroup,
    multiSelect = false,
    ...rest
  }: Props) {
    const { field, fieldState } = useController({ name, control });
  
    const findIndex = useCallback(() => {
      const values = multiSelect ? field.value : [field.value];
      const selected = [];
  
      for (const value of values) {
        for (const [i, option] of options.entries()) {
          if ('options' in option) {
            for (const [j, option2] of option.options.entries()) {
              if (option2.value === value) {
                selected.push(new IndexPath(j, i));
                break;
              }
            }
          } else {
            if (option.value === value) {
              selected.push(new IndexPath(i));
              break;
            }
          }
        }
      }
  
      return multiSelect ? selected : selected[0];
    }, [options, field.value, multiSelect]);
  
    const [selectedIndex, setSelectedIndex] = useState(findIndex);
  
    const onSelect = (indexPaths: IndexPath | IndexPath[]) => {
      setSelectedIndex(indexPaths);
  
      const indexes = Array.isArray(indexPaths) ? indexPaths : [indexPaths];
  
      const values = indexes.map((index) => findOption(index, options).value);
  
      field.onChange(multiSelect ? values : values[0]);
      field.onBlur();
    };
  
    return (
      <>
        <FieldWrapper label={label} caption={caption} fieldState={fieldState}>
          {({ status }) => (
            <Select
              selectedIndex={selectedIndex}
              value={selectedIndex ? () => renderValue(selectedIndex, options) : null}
              onSelect={onSelect}
              status={status}
              multiSelect={multiSelect}
              placeholder={placeholder}
              {...rest}>
              {options.map((item) => {
                return 'options' in item ? renderGroup(item) : renderItem(item);
              })}
            </Select>
          )}
        </FieldWrapper>
      </>
    );
  }