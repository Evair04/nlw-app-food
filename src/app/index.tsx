import { useState, useRef } from 'react';

import { View, FlatList, SectionList, Text } from 'react-native';

import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products';
import { Header } from '@/components/header';
import { CategoryButton } from '@/components/category-button';
import { Product } from '@/components/product';

import { Link } from 'expo-router';
import { useCartStore } from '@/stores/cart-store';


export default function Home() {

  const cartStore = useCartStore();

  const [category, setCategory] = useState(CATEGORIES[0]);

  const selectionListRef = useRef<SectionList<ProductProps>>(null);

  const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0);

  function handleCategorySelection( selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory);
    
    if(selectionListRef.current) {
      selectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true
      });
    }

  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton title={item} isSelected={item === category} onPress={() => {
            handleCategorySelection(item);
          }} />
        )}
        horizontal
        className='max-h-10 m-t-5'
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
      />

      <SectionList
        ref={selectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}

        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item}/>
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (

            <Text className='text-xl text-white font-heading mt-8 mb-3'>
              {title}
            </Text>

        )}
        className='flex-1 p-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}

      />

    </View>
  );
}

