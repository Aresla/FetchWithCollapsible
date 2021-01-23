import React, { useState, useRef } from 'react';
import { CollapsibleWrapper, ItemWrapper, Panel, Title } from './Collapsible.styles';
import { Loader } from '../Loader';
import { useContactsAPI } from '../../hooks';

const Item = ({ item }) => {
  const { title, content } = item;
  const panelBody = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const currentHeight = isExpanded ? panelBody.current.clientHeight : 0;
  const handleTitleClick = () => setIsExpanded(!isExpanded);

  return (
    <ItemWrapper className={isExpanded ? 'isExpended' : null}>
      <Title onClick={handleTitleClick}>{title}</Title>
      <Panel $height={currentHeight}>
        <div ref={panelBody}>{content}</div>
      </Panel>
    </ItemWrapper>
  );
};

export const Collapsible = () => {
  const [{ isLoading, users }] = useContactsAPI();
  return (
    <CollapsibleWrapper>
      {isLoading ? <Loader /> : users.map((item) => <Item key={item.title} item={item} />)}
    </CollapsibleWrapper>
  );
};
