import React from 'react';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import PropTypes from 'prop-types';
import {
    Header,
    Picker,
    Icon,
    Item,
    Input,
} from 'native-base';
import DefaultHeader from 'components/DefaultHeader/DefaultHeader';

const HeaderPresentational = ({
    searchQuery,
    sortingOption,
    onSearchChange,
    onSortingChange,
}) => (
    <ErrorBoundary>
        <DefaultHeader title="Countries" />
        <Header searchBar rounded>
            <Picker
                mode="dropdown"
                onValueChange={onSortingChange}
                iosHeader="Order by"
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={sortingOption}
            >
                <Picker.Item label="Total Top" value="total desc" />
                <Picker.Item label="Total Low" value="total asc" />
                <Picker.Item label="Deaths Top" value="deaths desc" />
                <Picker.Item label="Deaths Low" value="deaths asc" />
                <Picker.Item label="Recoveries Top" value="recoveries desc" />
                <Picker.Item label="Recoveries Low" value="recoveries asc" />
                <Picker.Item label="Remaining cases Top" value="remaining desc" />
                <Picker.Item label="Remaining cases Low" value="remaining asc" />
            </Picker>
            <Item>
                <Icon name="ios-search" />
                <Input
                    placeholder="Search"
                    value={searchQuery}
                    onChange={onSearchChange}
                />
            </Item>
        </Header>
    </ErrorBoundary>
);

HeaderPresentational.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    sortingOption: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onSortingChange: PropTypes.func.isRequired,
};

HeaderPresentational.displayName = 'HeaderPresentational';
export default React.memo(HeaderPresentational);
