package top.qx.productmanagementapi.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import top.qx.productmanagementapi.entity.Product;
import top.qx.productmanagementapi.mapper.ProductMapper;
import top.qx.productmanagementapi.service.ProductService;


@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product
        > implements ProductService {
}