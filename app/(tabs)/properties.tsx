import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { PropertyCard } from '@/components/PropertyCard';
import { usePropertyStore } from '@/store/property-store';
import { Property } from '@/types';

export default function PropertiesScreen() {
  const { properties, fetchProperties, isLoading } = usePropertyStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    minPrice: '',
    maxPrice: '',
  });
  
  useEffect(() => {
    fetchProperties();
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [properties, searchQuery, filters]);
  
  const applyFilters = () => {
    let filtered = [...properties];
    
    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        property => 
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(property => property.type === filters.type);
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(property => property.status === filters.status);
    }
    
    // Apply price filters
    if (filters.minPrice) {
      filtered = filtered.filter(
        property => property.pricePerToken >= parseInt(filters.minPrice)
      );
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(
        property => property.pricePerToken <= parseInt(filters.maxPrice)
      );
    }
    
    setFilteredProperties(filtered);
  };
  
  const handleRefresh = () => {
    fetchProperties();
  };
  
  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };
  
  const clearFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      minPrice: '',
      maxPrice: '',
    });
    setSearchQuery('');
  };
  
  const renderFilterButton = (
    label: string, 
    value: string, 
    filterKey: 'type' | 'status', 
    filterValue: string
  ) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filters[filterKey] === filterValue && styles.filterButtonActive,
      ]}
      onPress={() => setFilters({ ...filters, [filterKey]: filterValue })}
    >
      <Text
        style={[
          styles.filterButtonText,
          filters[filterKey] === filterValue && styles.filterButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search properties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity 
          style={styles.filterIconButton}
          onPress={toggleFilter}
        >
          <Filter size={20} color={colors.primary.blue} />
        </TouchableOpacity>
      </View>
      
      {filterVisible && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Property Type</Text>
            <View style={styles.filterOptions}>
              {renderFilterButton('All', 'all', 'type', 'all')}
              {renderFilterButton('Residential', 'residential', 'type', 'residential')}
              {renderFilterButton('Commercial', 'commercial', 'type', 'commercial')}
              {renderFilterButton('Industrial', 'industrial', 'type', 'industrial')}
            </View>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Status</Text>
            <View style={styles.filterOptions}>
              {renderFilterButton('All', 'all', 'status', 'all')}
              {renderFilterButton('Available', 'available', 'status', 'available')}
              {renderFilterButton('Fully Funded', 'fully-funded', 'status', 'fully-funded')}
              {renderFilterButton('Coming Soon', 'coming-soon', 'status', 'coming-soon')}
            </View>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Price Per Token</Text>
            <View style={styles.priceFilterContainer}>
              <View style={styles.priceInputContainer}>
                <Text style={styles.priceInputLabel}>Min</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="0"
                  value={filters.minPrice}
                  onChangeText={(text) => setFilters({ ...filters, minPrice: text })}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.priceInputContainer}>
                <Text style={styles.priceInputLabel}>Max</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="1000"
                  value={filters.maxPrice}
                  onChangeText={(text) => setFilters({ ...filters, maxPrice: text })}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.clearFiltersButton}
            onPress={clearFilters}
          >
            <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
        </Text>
      </View>
      
      {isLoading && properties.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.blue} />
        </View>
      ) : (
        <FlatList
          data={filteredProperties}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PropertyCard property={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No properties found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your filters or search query
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary.gray,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary.gray,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text.primary,
  },
  filterIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary.blue}10`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary.gray,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: colors.secondary.gray,
  },
  filterButtonActive: {
    backgroundColor: colors.primary.blue,
  },
  filterButtonText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  filterButtonTextActive: {
    color: colors.secondary.white,
  },
  priceFilterContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  priceInputContainer: {
    flex: 1,
  },
  priceInputLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: colors.secondary.gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  clearFiltersButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  clearFiltersText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.blue,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultsText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  listContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.secondary.gray,
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});