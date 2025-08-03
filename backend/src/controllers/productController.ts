import { Request, Response } from "express"
import { Product } from "../models/productModel"

const getAllProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await Product.find()
    res.json({
      success: true,
      message: "obteniendo los productos",
      data: products
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const addNewProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body
    // VALIDACIONES DE INPUT - ZOD
    const newProduct = new Product(body)
    await newProduct.save()

    res.status(201).json({
      success: true,
      message: "producto creado con éxito",
      data: newProduct,
    })
  } catch (error) {
    const err = error as Error
    console.log(err)
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id
  try {
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) return res.status(404).json({
      success: false,
      message: "producto no encontrado"
    })

    res.json({
      success: true,
      message: "producto borrado con éxito",
      data: deletedProduct
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const updateProduct = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id
  const body = req.body
  // VALIDACIONES DE INPUT - ZOD
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true })
    if (!updatedProduct) return res.status(404).json({
      success: false,
      message: "producto no encontrado"
    })
    res.json({
      success: true,
      message: "producto actualizado con éxito",
      data: updatedProduct
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const searchProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "El término de búsqueda es requerido"
      });
    }

    const searchTerm = String(query);

    // Búsqueda parcial e insensible a mayúsculas/minúsculas
    const products = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } }
      ]
    });

    res.json({
      success: true,
      message: "búsqueda de productos realizada con éxito",
      data: products
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export { getAllProducts, addNewProduct, deleteProduct, updateProduct, searchProducts }