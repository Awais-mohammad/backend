import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from "./storage.config"
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return + cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  uploadAvatar(@UploadedFile() file) {
    return file.filename
  }

  @Get('avatar/:imgpath') seeUploadedFile(@Param('imgpath') image, @Res() res) { return res.sendFile(image, { root: './uploads' }); }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.productsService.searchProducts(name);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
