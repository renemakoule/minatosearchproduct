'use client'

import { useState } from 'react'
import { Filter, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { BorderBeam } from './ui/border-beam'

export default function FixedFilterButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    price: false,
    rating: false,
    availability: false,
  })

  const handleFilterChange = (filter: keyof typeof selectedFilters) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: !prev[filter] }))
  }

  const activeFiltersCount = Object.values(selectedFilters).filter(Boolean).length

  return (
    <div className="fixed z-10">
      <TooltipProvider>
        <Tooltip>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    'h-10 w-10 rounded-full shadow-lg transition-all duration-200 ease-in-out',
                    isOpen && 'bg-primary text-primary-foreground'
                  )}
                >
                  <Filter className={cn('h-6 w-6', isOpen && 'text-primary-foreground')} />
                  <span className="sr-only">Open filter menu</span>
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                  
                <BorderBeam size={250} duration={12} delay={9} />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <DropdownMenuContent className="w-56 ml-16" align="end" side="top">
              <DropdownMenuLabel>Filters</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedFilters.price}
                onCheckedChange={() => handleFilterChange('price')}
              >
                Price
                {selectedFilters.price && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedFilters.rating}
                onCheckedChange={() => handleFilterChange('rating')}
              >
                Evaluation
                {selectedFilters.rating && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedFilters.availability}
                onCheckedChange={() => handleFilterChange('availability')}
              >
                Availability
                {selectedFilters.availability && <Check className="h-4 w-4 ml-auto" />}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipContent side="left" align="center">
            <p>Filter results</p>
            {activeFiltersCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {activeFiltersCount} filtered{activeFiltersCount > 1 ? 's' : ''} active{activeFiltersCount > 1 ? 's' : ''}
              </p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}